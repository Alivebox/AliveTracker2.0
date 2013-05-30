Ext.define('AliveTracker.view.group.Groups', {

    extend: 'Ext.Container',
    xtype: 'groups',
    cls: 'groups-main-container',

    initComponent: function(){
        this.items = [
            {
                xtype: 'container',
                cls: 'groups-container',
                items:[
                    {
                        xtype:'container',
                        layout: 'column',
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
                        cls: 'groups-view'
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
                        xtype: 'belonggroupsview',
                        itemId: 'belongGroupsView',
                        store: 'groups.BelongGroups',
                        cls: 'belong-groups-view'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onAddGroupClick: function(){
        this.fireEvent('addGroup');
    }

});
