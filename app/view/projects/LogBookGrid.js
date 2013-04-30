Ext.define('AliveTracker.view.projects.LogBookGrid', {

    extend:'Ext.grid.Panel',
    xtype:'logbookgrid',
    cls: 'logbook-grid-container',
    height: 235,

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    cls: 'logbook-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                    sortable:false,
                    flex: 3,
                    dataIndex:'project_name'
                },
                {
                    xtype:'gridcolumn',
                    cls: 'logbook-grid-activity-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
                    sortable:false,
                    flex: 6,
                    dataIndex:'activity',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype:'actioncolumn',
                    cls: 'logbook-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIONS,
                    sortable:false,
                    flex: 1,
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
                    cls: 'logbook-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
                    sortable:false,
                    flex: 1,
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

