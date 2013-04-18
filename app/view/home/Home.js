Ext.define('AliveTracker.view.home.Home', {

    extend:'Ext.container.Container',
    xtype:'homeview',

    initComponent:function () {
        var tmpGroupsViewer = this.getGroupsViewer();
        var tmpBelongGroupsViewer = this.getBelongGroupsViewer();
        this.items = [
            {
                xtype:'label',
                text: Locales.AliveTracker.HOME_LABEL_GROUPS
            },
            {
                xtype:'container',
                layout: 'hbox',
                items: [
                    tmpGroupsViewer,
                    tmpBelongGroupsViewer
                ]
            },
            {
                xtype:'button',
                text:Locales.AliveTracker.HOME_LABEL_NEW,
                listeners: {
                    scope: this,
                    click: 'onCreateNewGroup'
                }
            }
        ];
        this.callParent(arguments);
    },

    getGroupsViewer:function () {
        var tmpGroupsViewer = {
            xtype: 'homegroupsviewer',
            store:'Groups',
            listeners: {
                scope: this,
                select: 'onSelectRow'
            }
        };
        return tmpGroupsViewer;
    },

    getBelongGroupsViewer:function () {
        var tmpBelongGroupsViewer = {
            xtype: 'homebelonggroupsviewer',
            store: 'BelongGroups',
            listeners: {
                scope: this,
                select: 'onSelectRowBelongGroups'
            }
        };
        return tmpBelongGroupsViewer;
    },

    onCreateNewGroup: function() {
        this.fireEvent('onShowCreateNewGroup', this);
    },

    onSelectRow: function(agrComponent, record, index) {
        this.fireEvent('onShowGroupPage',this, agrComponent, record, index);
    },

    onSelectRowBelongGroups: function(agrComponent, record, index) {
        this.fireEvent('onShowBelongGroupPage',this, agrComponent, record, index);
    }

});