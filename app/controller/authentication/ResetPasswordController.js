
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
                resetPasswordClick: this.onResetPassword

            }
        });
    },
    onResetPassword: function(argRecord){
        debugger;
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginPage');
    }
});