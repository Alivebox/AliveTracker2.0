Ext.define('AliveTracker.view.group.ProjectsGrid', {

    extend:'Ext.grid.Panel',
    xtype:'projectGrid',

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
                    dataIndex:'name'
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    align:'center',
                    text:Locales.AliveTracker.GROUP_PROJECT_LABEL_MEMBERS
                },
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    align:'center',
                    text:Locales.AliveTracker.GROUP_PROJECT_LABEL_CREATED
                },
                {
                    xtype:'actioncolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_BUTTONS,
                    sortable:false,
                    align:'center',
                    items:[
                        {
                            icon:AliveTracker.defaults.Constants.EDIT_GRID_ROW_BUTTON,
                            tooltip:Locales.AliveTracker.GROUP_DETAIL_EDIT_USER_OF_PROJECT,
                            handler:function (grid, rowIndex, colIndex) {
                                this.addProjectPopup = Ext.create('AliveTracker.view.users.UserRolesAssignmentPopUp');
                                this.addProjectPopup.title = grid.store.getAt(rowIndex).data.name;
                                this.addProjectPopup.show();
                            }
                        },
                        {
                            icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                            tooltip:AliveTracker.defaults.Constants.GROUP_DETAIL_REMOVE_USER_OF_PROJECT,
                            handler:function (grid, rowIndex, colIndex) {
                                Ext.MessageBox.confirm(
                                    'Confirm',
                                    Ext.util.Format.format(Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
                                    function (argButton) {
                                        if (argButton == 'yes') {
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