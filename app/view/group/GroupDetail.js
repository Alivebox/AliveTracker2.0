Ext.define('AliveTracker.view.group.GroupDetail', {

    extend: 'Ext.Container',
    xtype: 'groupdetailform',
    cls:'groupDetail',
    layout: 'column',

    initComponent: function(){
        this.items = [
            {
                xtype: 'groups'
            },
            {
                xtype: 'tabcontainer',
                itemId: 'GroupTab',
                hidden: true,
                cls:'groupTab',
                items: [
                    {
                        xtype:'logbook',
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
    }

});
