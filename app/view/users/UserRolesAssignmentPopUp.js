Ext.define('AliveTracker.view.users.UserRolesAssignmentPopUp', {

    extend:'Ext.window.Window',
    xtype:'userrolesassignmentpopup',
    title: Locales.AliveTracker.USERS_LABEL_ROLES_MANAGER ,
    resizable: false,
    height:300,
    width:500,
    modal: true,
    requieres:[
        'AliveTracker.view.users.AssignUsersToProjects'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype: 'assignuserstoprojectsview',
                projectName: this.projectName
            }
        ],
            this.callParent(arguments);
    }
});