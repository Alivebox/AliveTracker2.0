Ext.define('AliveTracker.view.authentication.ForgotPassword', {
    extend:'Ext.form.Panel',
    xtype:'forgotpasswordform',

    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'emailForgotPasswordView',
                fieldLabel: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_MAIL,
                allowBlank:false,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype:'button',
                text: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_RESET_INSTRUCTION,
                formBind: true,
                disabled: true,
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