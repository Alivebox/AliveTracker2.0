Ext.define('AliveTracker.view.group.GroupDetail', {

    extend: 'Ext.Container',
    xtype: 'groupdetailform',

    initComponent: function(){
        this.items = [
            {
                xtype: 'tabcontainer',
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
                    },
                    {
                        xtype: 'reportsform',
                        title: Locales.AliveTracker.GROUP_DETAIL_TITLE_REPORTS
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
    }

 });
