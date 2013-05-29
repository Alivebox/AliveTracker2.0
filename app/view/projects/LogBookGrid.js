Ext.define('AliveTracker.view.projects.LogBookGrid', {

    extend:'Ext.grid.Panel',
    xtype:'logbookgrid',
    cls: 'logbook-grid-container',
    height: 256,
    columnLines: true,

    initComponent:function () {
        var me = this;
        this.cmbProjects = this.createProjectsComboBox();
        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    cls: 'logbook-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                    sortable:false,
                    flex: 3,
                    dataIndex:'project_name',
                    editor: this.cmbProjects
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
                },
                {
                    xtype:'actioncolumn',
                    cls: 'logbook-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_NOTES,
                    sortable:false,
                    flex: 1,
                    align : 'center',
                    items:[
                        {
                            icon:AliveTracker.defaults.Constants.ADD_NOTES_ICON,
                            tooltip: Locales.AliveTracker.PROJECT_ADD_NOTES,
                            scope:this,
                            handler: this.onNotesIconClick
                        }
                    ]
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
                            tooltip: Locales.AliveTracker.PROJECT_REMOVE_ACTIVITY,
                            scope:this,
                            handler: this.onDeleteLog
                        }
                    ]
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

    createProjectsComboBox: function(){
        var tmpComboBox = Ext.create('Ext.form.field.ComboBox',{
            name: 'cmbProjects',
            store:'projects.Projects',
            displayField: 'name',
            queryMode:'local',
            editable:false
        });

        return tmpComboBox;
    },

    onDeleteLog: function(arGrid, argRowIndex){
        this.fireEvent('deleteLog', arGrid, argRowIndex);
    },

    onNotesIconClick: function(arGrid, argRowIndex, argColIndex, argIcon, argEvent, argRecord){
        this.fireEvent('notesIconClick', argRecord);
    },

    onEditCell: function(argGrid, argRecord){
        this.fireEvent('editCell', argRecord);
    },

    onSortColumn: function(argCt, argColumn){
        this.fireEvent('sortColumn',argColumn);
    }
 });

