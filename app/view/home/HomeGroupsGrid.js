Ext.define('AliveTracker.view.home.HomeGroupsGrid', {

    extend:'Ext.grid.Panel',
    xtype:'homegroupsgrid',
    cls:'homeGroups',
    initComponent: function(){
        Ext.applyIf(this, {
            columns:[
                {
                    xtype:'gridcolumn',
                    cls: 'home-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_MY_GROUPS,
                    sortable:false,
                    dataIndex:'name',
                    flex: 1
                },
                {
                    xtype:'actioncolumn',
                    cls: 'home-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_ACTIONS,
                    sortable:false,
                    align : 'center',
                    tdCls: 'custom-delete-column',
                    flex: 0.5,
                    items:[
                        {
                            scope: this,
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                            handler: function(grid, rowIndex, colIndex) {
                                 this.onDeleteGroup(rowIndex,this.getStore());
                            }
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    },

    onDeleteGroup: function(argRowIndex,argStore){
        this.fireEvent('onDeleteGroup', argRowIndex,argStore);
    }
});

