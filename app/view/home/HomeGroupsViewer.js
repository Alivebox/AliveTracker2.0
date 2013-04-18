Ext.define('AliveTracker.view.home.HomeGroupsViewer', {

    extend:'Ext.grid.Panel',
    xtype:'homegroupsviewer',
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
                            handler: function(grid, rowIndex, colIndex) {
                                Ext.MessageBox.confirm(
                                    'Confirm',
                                    Ext.util.Format.format( Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
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
            ]
        });
        this.callParent(arguments);
    }
});

