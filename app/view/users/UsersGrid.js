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
                    menuDisabled:true,
                    text: Locales.AliveTracker.USERS_LABEL_NAME,
                    sortable : false,
                    dataIndex: 'name'
                },
                {
                    xtype: 'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.USERS_LABEL_ROLE,
                    sortable : false,
                    width: 75,
                    dataIndex: 'role',
                    editor: this.cbUserGridRoles

                },
                {
                    xtype:'actioncolumn',
                    name: 'userGridActionId',
                    menuDisabled:true,
                    text: Locales.AliveTracker.GROUP_PROJECT_LABEL_BUTTONS,
                    sortable:false,
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