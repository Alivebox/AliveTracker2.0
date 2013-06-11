Ext.define('AliveTracker.view.users.UserRolesAssignmentPopUp', {

    extend:'Ext.window.Window',
    xtype:'userrolesassignmentpopup',
    cls: 'project-users-popup-view',
    header: false,
    resizable: false,
    height:335,
    width:545,
    modal: true,
    requieres:[
        'AliveTracker.view.users.AssignUsersToProjects'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: 'column',
                items: [
                    {
                        xtype: 'button',
                        icon: 'resources/images/delete.png',
                        cls: 'project-users-popup-view-icon',
                        listeners: {
                            scope: this,
                            click: this.onClosePopUp
                        }
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.NEW_PROJECT_LABEL,
                        cls: 'project-users-popup-view-txt'
                    }
                ]
            },
            {
                xtype: 'assignuserstoprojectsview',
                projectName: this.projectName
            }
        ],
        this.callParent(arguments);
    },

    onClosePopUp: function(){
        this.close();
    }
});