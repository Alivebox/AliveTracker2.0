Ext.define('AliveTracker.view.projects.LogBookGrid', {

    extend:'Ext.grid.Panel',
    xtype:'logbookgrid',
    cls: 'logbook-grid-container',
    height: 235,
    columnLines: true,

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
                    cls: 'logbook-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
                    flex: 6,
                    dataIndex:'activity',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    listeners:{
                        scope: this,
                        headerclick: this.onSortColumn
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
                            scope:this,
                            handler: this.onDeleteLog
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
                        enableKeyEvents: true,
                        hideTrigger: true,
                        maxValue: 24,
                        minValue: 0
                    }
                }
            ],
            selType: 'cellmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 2,
                    listeners:{
                        scope: this,
                        edit: this.onEditCell
                    }
                })
            ]
        });

        me.callParent(arguments);
    },

    onDeleteLog: function(arGrid, argRowIndex){
        this.fireEvent('deleteLog', arGrid, argRowIndex);
    },

    onEditCell: function(argGrid, argRecord){
        this.fireEvent('editCell', argRecord);
    },

    onSortColumn: function(argCt, argColumn){
        this.fireEvent('sortColumn',argColumn);
    }
 });

