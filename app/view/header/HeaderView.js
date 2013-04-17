Ext.define('AliveTracker.view.header.HeaderView', {

    extend: 'Ext.Container',
    xtype: 'headerview',

    initComponent: function() {
        this.items = [
            {
                xtype: 'button',
                text: Locales.AliveTracker.HEADER_USER_PROFILE,
                listeners: {
                    scope: this,
                    click: this.onUserProfile
                }
            },
            {
                xtype: 'button',
                text: Locales.AliveTracker.HEADER_LOG_OUT,
                listeners: {
                    scope: this,
                    click: this.onLogout
                }
            }
        ];
        this.callParent(arguments);
    },
    onUserProfile: function(){
        this.fireEvent('showUserProfile');
    },
    onLogout: function(){
        this.fireEvent('logout');
    }
});
