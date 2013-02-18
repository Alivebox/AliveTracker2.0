Ext.define('AliveTracker.view.users.UsersGrid', {

    extend: 'Ext.grid.Panel',
    xtype: 'usersGrid',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    menuDisabled:true,
                    text: 'Name',
                    sortable : false,
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
                },
                {
                    xtype:'actioncolumn',
                    menuDisabled:true,
                    text: 'Buttons',
                    sortable:false,
                    align : 'center',
                    items:[
                        {
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                            tooltip: AliveTracker.defaults.Constants.GROUP_DETAIL_REMOVE_USER,
                            handler: function(grid, rowIndex, colIndex) {
                                Ext.MessageBox.confirm(
                                    'Confirm',
                                    Ext.util.Format.format(AliveTracker.defaults.Constants.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
                                    function(argButton){
                                        if(argButton == 'yes')
                                        {
                                            grid.getStore().removeAt(rowIndex);
                                        }
                                    },
                                    this
                                );
                            }
                        }
                    ]
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