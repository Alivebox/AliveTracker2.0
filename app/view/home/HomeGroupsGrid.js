Ext.define('AliveTracker.view.home.HomeGroupsGrid', {

    extend:'Ext.grid.Panel',
    xtype:'homegroupsgrid',
    initComponent: function(){
        Ext.applyIf(this, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_MY_GROUPS,
                    sortable:false,
                    dataIndex:'name'
                },
                {
                    xtype:'actioncolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_ACTIONS,
                    sortable:false,
                    align : 'center',
                    items:[
                        {
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                            scope: this,
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

