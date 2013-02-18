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
                    text: 'Name',
                    sortable : false,
                    width: 175,
                    dataIndex: 'name'
                },
                {
                    xtype: 'gridcolumn',
                    menuDisabled:true,
                    text: 'Role',
                    sortable : false,
                    width: 75,
                    dataIndex: 'role',
                    editor: {
                        xtype:'combobox',
                        allowBlank:true,
                        store:'Roles',
                        displayField:'role',
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