Ext.define('AliveTracker.view.authentication.ForgotPassword', {
    extend:'Ext.form.Panel',
    xtype:'forgotpasswordform',
    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'emailForgotPasswordView',
                name:'email',
                fieldLabel:'Email',
                allowBlank:false,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype:'button',
                name:'resetInsructions',
                text:'Send me reset instructions',
                formBind: true,
                disabled: true,
                listeners:{
                    scope:this,
                    click:this.onSendResetInstruccionsClick
                }
            }
        ];
        this.callParent(arguments);
    },
    onSendResetInstruccionsClick:function () {
        this.fireEvent('sendResetInstruccions',this);
    }

});