Ext.define('AliveTracker.controller.authentication.ForgotPasswordController', {

    extend: "Ext.app.Controller",

    views: [
        'authentication.ForgotPassword',
        'authentication.Login'
    ],

    refs: [

        {
            ref: 'email',
            selector: 'forgotpasswordpopup [itemId=emailForgotPasswordView]'
        }
    ],
    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'forgotpasswordpopup': {
                sendResetInstructions: this.onSendResetInstructions

            },
            'loginform':{
                showForgotPassword:this.onShowForgotPasswordPopup
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
        this.forgotPasswordPopup.hide();
    },
    onShowForgotPasswordPopup:function () {
        this.forgotPasswordPopup = Ext.create('AliveTracker.view.authentication.ForgotPassword');
        this.forgotPasswordPopup.title = Locales.AliveTracker.FORGOT_PASSWORD_LABEL;
        this.forgotPasswordPopup.show();
    }
});