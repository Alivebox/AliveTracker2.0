Ext.define('AliveTracker.view.home.Home', {

    extend:'Ext.Container',
    xtype:'home',

    initComponent:function () {
        var tmpMyGroupsHeader = this.getMyGroupsHeader();
        var tmpGroupsViewer = this.getGroupsViewer();
        var tmpBelongGroups = this.getBelongGroupsHeader();
        var tmpBelongGroupsViewer = this.getBelongGroupsViewer();
        this.items = [
            tmpMyGroupsHeader,
            tmpGroupsViewer,
            tmpBelongGroups,
            tmpBelongGroupsViewer
        ];
        this.callParent(arguments);
    },

    getMyGroupsHeader:function () {
        var tmpMyGroupsHeader = {
            xtype:'container',
            layout:'column',
            items:[
                {
                    xtype:'label',
                    text: Locales.AliveTracker.HOME_LABEL_MY_GROUPS
                },
                {
                    xtype:'button',
                    text:Locales.AliveTracker.HOME_LABEL_NEW,
                    listeners: {
                        scope: this,
                        click: 'onCreateNewGroup'
                    }
                }
            ]
        };
        return tmpMyGroupsHeader;
    },

    getBelongGroupsHeader:function () {
        var tmpBelongGroupsHeader = {
            xtype:'container',
            layout:'column',
            items:[
                {
                    xtype:'label',
                    text: Locales.AliveTracker.HOME_LABEL_BELONG_GROUPS
                }
            ]
        };
        return tmpBelongGroupsHeader;
    },

    getGroupsViewer:function () {
        var tmpGroupsViewer = {
            xtype: 'homegroupsviewer',
            store: 'Groups'
        };
        return tmpGroupsViewer;
    },

    getBelongGroupsViewer:function () {
        var tmpBelongGroupsViewer = {
            xtype: 'homebelonggroupsviewer',
            store: 'BelongGroups'
        };
        return tmpBelongGroupsViewer;
    },

    onCreateNewGroup: function() {
        this.fireEvent('onCreateNewGroup', this);
    }

});