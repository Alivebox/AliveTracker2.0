Ext.define('AliveTracker.view.users.UsersList', {

    extend:'Ext.grid.Panel',
    xtype:'userslist',
    hideHeaders:true,
    multiSelect:true,
    scroll:'vertical',
    resizeble: false,
    height: 150,
    width: 235,

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text:Locales.AliveTracker.USERS_LABEL_NAME,
                    sortable:false,
                    flex: 1,
                    dataIndex:'name'
                }
            ]
        });

        me.callParent(arguments);
    }
});