Ext.define('AliveTracker.view.authentication.SetPassword', {

    extend:'Ext.container.Container',
    xtype: 'setpassword',
    cls: 'userprofile-main-container',
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
                    click:this.onSetPassword
                }
            }
        ];
        this.callParent(arguments);
    },

    onSetPassword:function () {
        this.fireEvent('setPassword', this);
    }
});