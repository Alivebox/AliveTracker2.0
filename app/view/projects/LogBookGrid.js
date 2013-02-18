Ext.define('AliveTracker.view.projects.LogBookGrid', {

    extend:'Ext.grid.Panel',
    xtype:'logbookgrid',

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text:'Project',
                    sortable:false,
                    dataIndex:'project'
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text:'Activity',
                    sortable:false,
                    dataIndex:'txtActivity',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text:'Time(h)',
                    sortable:false,
                    dataIndex:'time',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        maxValue: 24,
                        minValue: 1
                    }
                },
                {
                    xtype:'actioncolumn',
                    menuDisabled:true,
                    sortable:false,
                    align : 'center',
                    width: 25,
                    items:[
                        {
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
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
            selType: 'rowmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                })
            ]
        });

        me.callParent(arguments);
    }

 });

