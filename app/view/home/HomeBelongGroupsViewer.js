Ext.define('AliveTracker.view.home.HomeBelongGroupsViewer', {

    extend:'Ext.grid.Panel',
    xtype:'homegroupsviewer',
    cls:'homeBelongGroups',
    initComponent: function(){
        Ext.applyIf(this, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_BELONG_GROUPS,
                    sortable:false,
                    dataIndex:'name'
                }
            ]
        });
        this.callParent(arguments);
    }
});