Ext.define('AliveTracker.view.users.UsersGrid', {

    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',
    initComponent: function() {
        var me = this;
        this.cbUserGridRoles = this.onCreateRoleComboBox();
        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    cls: 'user-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.USERS_LABEL_NAME,
                    sortable : false,
                    flex: 2,
                    dataIndex: 'name'
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'user-grid-role-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.USERS_LABEL_ROLE,
                    sortable : false,
                    flex: 5,
                    dataIndex: 'role',
                    editor: this.cbUserGridRoles

                },
                {
                    xtype:'actioncolumn',
                    cls: 'user-grid-column',
                    name: 'userGridActionId',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_ACTIONS,
                    sortable:false,
                    flex: 1,
                    align : 'center',
                    items:[
                        {
                            tooltip: Locales.AliveTracker.GROUP_DETAIL_REMOVE_USER
                        }
                    ]
                }
            ],
            selType: 'cellmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                 clicksToEdit: 1
                })
            ]
        });

        me.callParent(arguments);
    },

    onCreateRoleComboBox: function(){
        var tmpComboBox = Ext.create('Ext.form.field.ComboBox',{
            name: 'cbUserGridRoles',
            allowBlank:true,
            store:'roles.Roles',
            displayField:'name',
            queryMode:'local',
            editable:false
        });

        return tmpComboBox;
    }
});