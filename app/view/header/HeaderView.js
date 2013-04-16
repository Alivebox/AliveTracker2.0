Ext.define('AliveTracker.view.header.HeaderView', {

    extend: 'Ext.Container',
    xtype: 'headerview',

    initComponent: function() {
        this.items = [
            {
                xtype: 'button',
                text: 'User Profile',
                listeners: {
                    scope: this,
                    click: this.onUserProfile
                }
            }
        ];
        this.callParent(arguments);
    },

    onUserProfile: function(){
        this.fireEvent('showUserProfile');
    }

});
