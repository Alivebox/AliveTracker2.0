Ext.define('AliveTracker.view.authentication.ResetPassword', {
    extend:'Ext.form.Panel',
    xtype:'resetpasswordform',
    cls:'reset-password',

    initComponent: function() {
        this.items = [
            {
                xtype: 'passwordverification',
                itemId:'passwordverification'
            },
            {
                xtype: 'button',
                cls: 'all-views-button userprofile-button',
                text: Locales.AliveTracker.SET_RESET_PASSWORD_LABEL,
                listeners:{
                    scope:this,
                    click:this.onResetPassword
                }
            }
        ];
        this.callParent(arguments);
    },

    onResetPassword:function () {
        this.fireEvent('resetPassword', this);
    }
});