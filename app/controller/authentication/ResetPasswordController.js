
Ext.define('AliveTracker.controller.authentication.ResetPasswordController', {

    extend: "Ext.app.Controller",

    views: [
        'authentication.ResetPassword'
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
    }

});