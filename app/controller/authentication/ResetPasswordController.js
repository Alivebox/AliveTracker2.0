Ext.define('AliveTracker.controller.authentication.ResetPasswordController', {

    extend: "Ext.app.Controller",

    views: [
        'authentication.ResetPassword'
    ],

    refs: [
        {
            ref:'passwordVerification',
            selector:'resetpasswordform [itemId=passwordverification]'
        }
    ],

    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'resetpasswordform': {
                resetPassword: this.onResetPassword
            }
        });
    },
    onResetPassword: function(){
        var tmpPasswordVerification = this.getPasswordVerification();
        if( !tmpPasswordVerification.isValid() ){
            Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.SET_PASSWORD_INVALID);
            return;
        }
        var tmpQueryString = document.location.href.split('?')[1];
        var tmpQueryStringObject = Ext.Object.fromQueryString(tmpQueryString);
        var tmpPassword = tmpPasswordVerification.getValue();
        var tmpForgotPassword = Ext.create('AliveTracker.model.authentication.ForgotPassword',{
            email: tmpQueryStringObject.email,
            token: tmpQueryStringObject.token,
            password: Framework.util.MD5Util.calcMD5(tmpPassword)
        });
        tmpForgotPassword.save({
            scope: this,
            urlOverride: AliveTracker.defaults.WebServices.USER_RESET_PASSWORD,
            success: this.onResetPasswordCallback
        });
    },

    onResetPasswordCallback: function(argRecord){
        var tmpUser = argRecord;
        Framework.core.SecurityManager.logInUser(argRecord.data.email,this.getDefaultPermissions());
        Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SET_PASSWORD_SUCCESS_RESET);
        Framework.core.ViewsManager.reconfigureViewsAndShowPage('groupDetailPage');
    },

    getDefaultPermissions: function(){
        var tmpDefaultPermissions = [
            'viewHome',
            'viewGroupDetail'
        ];
        return tmpDefaultPermissions;
    }
});