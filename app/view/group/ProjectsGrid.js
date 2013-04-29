Ext.define('AliveTracker.view.group.ProjectsGrid', {

    extend:'Ext.grid.Panel',
    xtype:'projectgrid',
    cls: 'projectTab',
    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_NAME,
                    sortable:false,
                    align:'center',
                    dataIndex:'name',
                    flex:2
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    align:'center',
                    text:Locales.AliveTracker.GROUP_PROJECT_LABEL_CREATED,
                    dataIndex:'created',
                    flex:2
                },
                {
                    xtype:'actioncolumn',
                    id: 'projectGridActionId',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_BUTTONS,
                    sortable:false,
                    align:'center',
                    flex:0.5,
                    items:[
                        {
                            tooltip:Locales.AliveTracker.GROUP_DETAIL_EDIT_USER_OF_PROJECT
                        },
                        {
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
    }
});