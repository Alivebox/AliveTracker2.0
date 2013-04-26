Ext.define('AliveTracker.view.home.Home', {

    extend:'Ext.container.Container',
    xtype:'homeview',
    cls:'home',

    requires: [
        'AliveTracker.view.home.AddGroupPopUp',
        'AliveTracker.view.home.HomeBelongGroupsGrid',
        'AliveTracker.view.home.HomeGroupsGrid'
    ],

    initComponent:function () {
        var tmpGroupsGrid = this.getGroupsGrid();
        var tmpBelongGroupsGrid = this.getBelongGroupsGrid();
        this.items = [
            {
                xtype:'label',
                text: Locales.AliveTracker.HOME_LABEL_GROUPS,
                cls:'home-title'
            },
            {
                xtype:'container',
                layout: 'hbox',
                items: [
                    tmpGroupsGrid,
                    tmpBelongGroupsGrid
                ]
            },
            {
                xtype:'button',
                text:Locales.AliveTracker.HOME_LABEL_NEW,
                cls:'all-views-button',
                listeners: {
                    scope: this,
                    click: 'onCreateNewGroup'
                }
            }
        ];
        this.callParent(arguments);
    },

    getGroupsGrid:function () {
        var tmpGroupsGird = {
            xtype: 'homegroupsgrid',
            store:'groups.Groups',
            listeners: {
                scope: this,
                select: 'onSelectRow'
            }
        };
        return tmpGroupsGird;
    },

    getBelongGroupsGrid:function () {
        var tmpBelongGroupsGrid = {
            xtype: 'homebelonggroupsgrid',
            store: 'groups.BelongGroups',
            listeners: {
                scope: this,
                select: 'onSelectRowBelongGroups'
            }
        };
        return tmpBelongGroupsGrid;
    },

    onCreateNewGroup: function() {
        this.fireEvent('onShowCreateNewGroup', this);
    },

    onSelectRow: function(agrComponent, argRecord) {
        this.fireEvent('groupSelected',argRecord);
    },

    onSelectRowBelongGroups: function(agrComponent, record, index) {
        this.fireEvent('onShowBelongGroupPage',this, agrComponent, record, index);
    }

});