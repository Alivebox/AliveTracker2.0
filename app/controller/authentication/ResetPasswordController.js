Ext.define('AliveTracker.controller.authentication.ResetPasswordController', {

    extend: "Ext.app.Controller",

    views: [
        'authentication.ResetPassword',
        'authentication.SetPassword'
    ],

    models:[
        'authentication.SetPassword'
    ],

    refs: [
        {
            ref:'passwordVerification',
            selector:'setpassword [itemId=passwordverification]'
        }
    ],
    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'resetpasswordform': {
                resetPassword: this.onResetPassword
            },
            'setpassword': {
                setPassword: this.onSetPassword
            }
        });
    },
    onResetPassword: function(){
        var tmpQueryString = document.location.href.split('?')[1];
        var tmpQueryStringObject = Ext.Object.fromQueryString(tmpQueryString);
        var tmpForgotPassword = Ext.create('AliveTracker.model.authentication.ForgotPassword',{email: tmpQueryStringObject.email, token: tmpQueryStringObject.token});
        tmpForgotPassword.save({
            scope: this,
            urlOverride: AliveTracker.defaults.WebServices.USER_RESET_PASSWORD,
            callback: this.onResetPasswordCallback
        });
    },

    onResetPasswordCallback: function(argRecord, argOperation){
        if(argOperation.success){
            Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SUCCESS_RESET_PASSWORD);
            Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginPage');
        }
    },

    onSetPassword: function(){
        var tmpPasswordVerfication = this.getPasswordVerification();
        if( tmpPasswordVerfication.isValid() ){
            var tmpPassword = tmpPasswordVerfication.getValue();
            var tmpModelSetPassword = Ext.create('AliveTracker.model.authentication.SetPassword',{
                password: Framework.util.MD5Util.calcMD5(tmpPassword)
            });
            tmpModelSetPassword.save({
                scope: this,
                success: this.onSuccessSetPassword
            });
        }
    },

    onSuccessSetPassword: function(argRecord){
        Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SET_PASSWORD_SUCCESS_RESET);
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'groupDetailPage');
    }

});