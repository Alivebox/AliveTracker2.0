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
                xtype: 'label',
                itemId: 'usernamelabel',
                cls: 'username-label'
            },
            {
                xtype:'button',
                cls:'logo',
                listeners:{
                    scope: this,
                    click: this.onGoHome
                }
            }
        ];
        this.callParent(arguments);
    },
    onUserProfile: function(){
        this.fireEvent('showUserProfile');
    },
    onGoHome: function(){
        this.fireEvent('goHome', this);
    },
    onLogout: function(){
        this.fireEvent('logout');
    }
});
