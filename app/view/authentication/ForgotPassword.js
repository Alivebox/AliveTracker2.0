Ext.define('AliveTracker.view.authentication.ForgotPassword', {
    extend:'Ext.window.Window',
    xtype:'forgotpasswordpopup',

    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'emailForgotPasswordView',
                fieldLabel: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_MAIL,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype:'button',
                text: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_RESET_INSTRUCTION,
                listeners:{
                    scope:this,
                    click:this.onSendResetInstructionsClick
                }
            }
        ];
        this.callParent(arguments);
    },
    onSendResetInstructionsClick:function () {
        this.fireEvent('sendResetInstructions',this);
    }

});