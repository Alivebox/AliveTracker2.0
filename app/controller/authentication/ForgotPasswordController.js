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
        debugger;
        var tmpEmail = this.getEmail().value;
        var tmpForgotPassStore = Ext.create('AliveTracker.model.authentication.ForgotPassword');
        tmpForgotPassStore.save({
            scope: this,
            callback: this.onSendResetInstructionsResult
        });
    },


    onSendResetInstructionsResult: function(){
        debugger;
    }
});