Ext.define('AliveTracker.view.authentication.ResetPassword', {
    extend:'Ext.form.Panel',
    xtype:'resetpasswordform',
    cls:'reset-password',

    initComponent:function () {
        this.items = [
            {
                xtype:'button',
                cls:'all-views-button align-button',
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
        this.fireEvent('resetPassword',this);
    }

});