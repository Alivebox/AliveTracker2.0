Ext.define('AliveTracker.view.home.HomeGroupsGrid', {

    extend:'Ext.grid.Panel',
    xtype:'homegroupsgrid',
    itemId: 'mygroupsgrid',
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
                    flex: 2
                },
                {
                    xtype:'actioncolumn',
                    cls: 'home-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_ACTIONS,
                    sortable:false,
                    align : 'center',
                    tdCls: 'custom-delete-column',
                    flex: 1,
                    items:[
                        {
                            scope: this,
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                            handler: function(grid, rowIndex, colIndex) {
                                 this.onDeleteGroup(rowIndex,this.getStore());
                            }
                        }
                    ]
                },
                {
                    xtype: 'checkcolumn',
                    dataIndex: 'default_group',
                    renderer: function(value) {
                        return "<input type='radio' name = 'primaryRadio' " + (value ? "checked='checked'" : "") + ">";
                    },
                    cls: 'home-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_DEFAULT,
                    sortable:false,
                    align : 'center',
                    listeners:{
                        scope: this,
                        checkchange:this.onSelectRadio
                    }
                }
            ]
        });
        this.callParent(arguments);
    },

    onDeleteGroup: function(argRowIndex,argStore){
        this.fireEvent('onDeleteGroup', argRowIndex,argStore);
    },

    onSelectRadio: function(argComponent,argSelectedRow){
        var tmpStore = this.getStore();
        this.fireEvent('defaultGroupSelected', argSelectedRow, tmpStore);
    }
});

