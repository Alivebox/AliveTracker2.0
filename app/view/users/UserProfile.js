Ext.define('AliveTracker.view.users.UserProfile', {

    extend:'Ext.container.Container',
    xtype: 'userprofile',
    initComponent: function() {
        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Name'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Email'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Password'
            },
            {
                xtype: 'button',
                text: 'Save'
            }
        ];
        this.callParent(arguments);
    }
});