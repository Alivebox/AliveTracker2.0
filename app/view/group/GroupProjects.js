Ext.define('AliveTracker.view.group.GroupProjects', {

    extend: 'Ext.Container',
    xtype: 'groupprojects',
    requires : [
        'AliveTracker.view.group.ProjectsGrid',
        'AliveTracker.view.users.AssignUsersToProjects'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype: 'button',
                text: 'New Project',
                listeners:{
                    scope: this,
                    click: this.onAddProjectClick
                }
            },
            {
                xtype: 'projectGrid',
                store: 'Projects'
            }
        ];
        this.callParent(arguments);
    },

    /**
     * Fire a event to GroupDetailController
     * */
    onAddProjectClick: function(){
        this.fireEvent('addProject');
    }
});