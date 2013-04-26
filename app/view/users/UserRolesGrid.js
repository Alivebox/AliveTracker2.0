Ext.define('AliveTracker.view.users.UserRolesGrid', {

    extend: 'Ext.grid.Panel',
    xtype: 'userrolesgrid',
    hideHeaders:true,
    multiSelect:true,
    scroll:'vertical',
    resizeble: false,
    maxHeight: 150,
    minHeight: 150,
    maxWidth: 250,
    minWidth: 250,


    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.USERS_LABEL_NAME,
                    sortable : false,
                    width: 175,
                    dataIndex: 'name'
                },
                {
                    xtype: 'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.USERS_LABEL_ROLE,
                    sortable : false,
                    width: 75,
                    dataIndex: 'role',
                    editor: {
                        xtype:'combobox',
                        allowBlank:true,
                        store:'roles.Roles',
                        displayField:'name',
                        queryMode:'local',
                        editable:false
                    }
                }
            ],
            selType: 'cellmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]
        });

        me.callParent(arguments);
    }
});