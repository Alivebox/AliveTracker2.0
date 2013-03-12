Ext.define('AliveTracker.view.header.HeaderView', {

    extend: 'Ext.Container',
    xtype: 'headerview',

    initComponent: function() {
        this.items = [
            {
                xtype: 'button',
                text: 'User Profile'
            }
        ];
        this.callParent(arguments);
    }

});
