Ext.define('AliveTracker.view.group.GroupDetail', {

    extend: 'Ext.Container',
    xtype: 'groupdetailform',
    requires : [
        'AliveTracker.view.group.AddUsersGroup',
        'AliveTracker.view.group.ProjectsGrid',
        'AliveTracker.view.group.GroupProjects',
        'AliveTracker.view.users.AssignUsersToProjects',
        'AliveTracker.view.projects.LogBookForm'
    ],
    groupData: null,
    initComponent: function(){
        this.groupTitleLabel = this.onCreateGroupTitleTextField();
        this.groupImage = this.onCreateGroupImage();
        this.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        xtype:'logbookform',
                        title: Locales.AliveTracker.GROUP_DETAIL_TITLE_LOG_BOOK
                    },
                    {
                        xtype: 'groupprojects',
                        title: Locales.AliveTracker.GROUP_DETAIL_TITLE_PROJECTS
                    },
                    {
                        xtype: 'addusersgroup',
                        title: Locales.AliveTracker.GROUP_DETAIL_TITLE_USERS
                    }
                ]

            }
        ];
        this.callParent(arguments);
    },

    /**
     * Fire a event to GroupDetailController
     * */
    onManageUsersClick: function(){
        this.fireEvent('manageUser');
    },

    /**
     * Fire a event to GroupDetailController
     * */
    onAddProjectClick: function(){
        this.fireEvent('addProject');
    },

    /**
     * Create a groupTitle label
     * */
    onCreateGroupTitleTextField: function(){
        var tmpGroupTitleTextField = Ext.create('Ext.form.Label',{
            name:'groupNameLabelField'
        });
        return tmpGroupTitleTextField;
    },

    /**
     * Create Ext.Img component
     * */
    onCreateGroupImage: function(){
        var tmpImage = Ext.create('Ext.Img', {
            renderTo: Ext.getBody()
        });
        return tmpImage;
    }
 });
