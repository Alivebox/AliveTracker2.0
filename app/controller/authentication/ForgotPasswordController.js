Ext.define('AliveTracker.controller.authentication.ForgotPasswordController', {

    extend: "Ext.app.Controller",

    requires : [
        'AliveTracker.view.authentication.ForgotPassword'
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
                sendResetInstruccions: this.onSendResetInstruccions

            }
        });
    },

    /**
     * Sends via email the reset password instructions
     */
    onSendResetInstruccions: function(){
        var tmpEmail = this.getEmail().value;
        debugger;
    }
});