Ext.define('AliveTracker.view.home.HomeBelongGroupsGrid', {

    extend:'Ext.grid.Panel',
    cls:'homeBelongGroups',
    xtype:'homebelonggroupsgrid',
    initComponent: function(){
        Ext.applyIf(this, {
            columns:[
                {
                    xtype:'gridcolumn',
                    cls: 'home-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_BELONG_GROUPS,
                    sortable:false,
                    dataIndex:'name',
                    flex: 1
                }
            ]
        });
        this.callParent(arguments);
    }
});