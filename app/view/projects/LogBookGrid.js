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
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                    sortable:false,
                    align : 'center',
                    dataIndex:'project_name'
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
                    sortable:false,
                    align : 'center',
                    dataIndex:'activity',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype:'actioncolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIONS,
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
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
                    sortable:false,
                    align : 'center',
                    dataIndex:'time',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        maxValue: 24,
                        minValue: 1
                    }
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

