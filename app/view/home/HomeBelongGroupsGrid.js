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
                },
                {
                    xtype: 'checkcolumn',
                    dataIndex: 'default_group',
                    renderer: function(value) {
                        return "<input type='radio' name = 'primaryRadio' " + (value ? "checked='checked'" : "") + ">";
                    },
                    cls: 'home-grid-column',
                    menuDisabled:true,
                    text: Locales.AliveTracker.HOME_LABEL_DEFAULT,
                    sortable:false,
                    align : 'center',
                    listeners:{
                        scope: this,
                        checkchange:this.onSelectRadio
                    }
                }
            ]
        });
        this.callParent(arguments);
    },

    onSelectRadio: function(argComponent,argSelectedRow){
        var tmpStore = this.getStore();
        this.fireEvent('defaultGroupSelected', argSelectedRow, tmpStore);
    }
});