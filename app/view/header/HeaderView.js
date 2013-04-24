Ext.define('AliveTracker.view.header.HeaderView', {

    extend: 'Ext.Container',
    xtype: 'headerview',
    cls: 'header',
    initComponent: function() {
        this.items = [
            {
                xtype: 'button',
                cls:'logout-btn',
                listeners: {
                    scope: this,
                    click: this.onLogout
                }
            },
            {
                xtype: 'button',
                cls:'profile-btn',
                listeners: {
                    scope: this,
                    click: this.onUserProfile
                }
            },
            {
                xtype:'image',
                cls:'logo'
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
