Ext.define('AliveTracker.view.projects.ProjectsGrid', {

    extend:'Ext.grid.Panel',
    xtype:'projectgrid',
    cls: 'projectTab',
    columnLines: true,
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    cls: 'project-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_NAME,
                    sortable:false,
                    dataIndex:'name',
                    flex:2
                },
                {
                    xtype:'gridcolumn',
                    cls: 'project-grid-column',
                    menuDisabled:true,
                    text:Locales.AliveTracker.GROUP_PROJECT_LABEL_CREATED,
                    dataIndex:'created',
                    listeners:{
                        scope: this,
                        headerclick: this.onSortColumn
                    },
                    flex:2
                },
                {
                    xtype:'actioncolumn',
                    cls: 'project-grid-column',
                    id: 'projectGridActionId',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_ACTIONS,
                    sortable:false,
                    align:'center',
                    flex:0.5,
                    items:[
                        {
                            icon:AliveTracker.defaults.Constants.EDIT_GRID_ROW_BUTTON,
                            tooltip:Locales.AliveTracker.GROUP_DETAIL_EDIT_USER_OF_PROJECT
                        },
                        {
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                            tooltip:AliveTracker.defaults.Constants.GROUP_DETAIL_REMOVE_USER_OF_PROJECT
                        }
                    ]
                }
            ],
            selType:'cellmodel',
            plugins:[
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit:1
                })
            ]
        });

        me.callParent(arguments);
    },

    onSortColumn: function(argCt, argColumn){
        this.fireEvent('sortColumn',argColumn);
    }
});