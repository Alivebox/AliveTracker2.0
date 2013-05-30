Ext.define('AliveTracker.view.authentication.ResetPassword', {
    extend:'Ext.form.Panel',
    xtype:'resetpasswordform',
    cls:'reset-password',

    initComponent: function() {
        this.items = [
            {
                xtype: 'label',
                text: Locales.AliveTracker.RESET_PASSWORD_NEW,
                cls:'title'
            },
            {
                xtype: 'passwordverification',
                itemId:'passwordverification',
                cls:'password-verification'
            },
            {
                xtype: 'button',
                cls: 'all-views-button',
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