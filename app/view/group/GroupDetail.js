Ext.define('AliveTracker.view.group.GroupDetail', {

    extend: 'Ext.Container',
    xtype: 'groupdetailform',
    cls:'groupDetail',
    layout: 'column',

    initComponent: function(){
        this.items = [
            {
                xtype: 'container',
                cls: 'groups-main-container',
                items: [
                    {
                        xtype: 'container',
                        cls: 'groups-container',
                        items:[
                            {
                                xtype:'container',
                                layout: 'hbox',
                                items:[
                                    {
                                        xtype: 'label',
                                        text: Locales.AliveTracker.HOME_LABEL_MY_GROUPS,
                                        cls: 'groups-label'
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'all-views-button groups-add-button',
                                        text: null,
                                        icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
                                        tooltip: Locales.AliveTracker.GROUPS_ADD_BUTTON,
                                        listeners:{
                                            scope: this,
                                            click: this.onAddGroupClick
                                        }
                                    }
                                ]

                            },
                            {
                                xtype: 'groupsview',
                                itemId: 'groupsView',
                                store: 'groups.Groups',
                                cls: 'groups-view',
                                listeners: {
                                    scope: this,
                                    select: this.onGroupSelect
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'groups-line-container'
                    },
                    {
                        xtype: 'container',
                        cls: 'groups-container',
                        items:[
                            {
                                xtype: 'label',
                                text: Locales.AliveTracker.HOME_LABEL_BELONG_GROUPS,
                                cls: 'groups-label'
                            },
                            {
                                xtype: 'groupsview',
                                itemId: 'belongGroupsView',
                                store: 'groups.BelongGroups',
                                cls: 'belong-groups-view',
                                listeners: {
                                    scope: this,
                                    select: this.onGroupSelect
                                }
                            }
                        ]
                    }

                ]
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
                        title: Locales.AliveTracker.GROUP_DETAIL_TITLE_USERS,
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

    onAddGroupClick: function(){
        this.fireEvent('addGroup');
    },

    onGroupSelect: function(argView, argRecord){
        this.fireEvent('groupSelected', argView, argRecord.data);
    }

});
