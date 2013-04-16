Ext.define('AliveTracker.controller.authentication.ForgotPasswordController', {

    extend: "Ext.app.Controller",

    views: [
        'authentication.ForgotPassword'
    ],

    refs: [

        {
            ref: 'email',
            selector: 'forgotpasswordform [itemId=emailForgotPasswordView]'
        }
    ],
    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'forgotpasswordform': {
                sendResetInstructions: this.onSendResetInstructions

            }
        });
    },
    /**
     * Sends via email the reset password instructions
     */
    onSendResetInstructions: function(){
        var tmpForgotPassStore = Ext.create('AliveTracker.model.authentication.ForgotPassword',{email: this.getEmail().value});
        tmpForgotPassStore.save({
            scope: this,
            callback: this.onSendResetInstructionsResult
        });
    },
    onSendResetInstructionsResult: function(argRecord){
        Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SUCCESS_SEND_EMAIL_INSTRUCTION);
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginPage');
    }
});