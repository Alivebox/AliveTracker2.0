Ext.define('AliveTracker.view.authentication.ResetPassword', {
    extend:'Ext.form.Panel',
    xtype:'resetpasswordform',

    initComponent:function () {
        this.items = [
            {
                xtype:'button',
                text: Locales.AliveTracker.RESET_PASSWORD_LABEL,
                listeners:{
                    scope:this,
                    click:this.onResetPasswordClick
                }
            }
        ];
        this.callParent(arguments);
    },
    onResetPasswordClick:function () {
        this.fireEvent('resetPasswordClick',this);
    }

});