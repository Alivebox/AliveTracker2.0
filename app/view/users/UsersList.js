Ext.define('AliveTracker.view.users.UsersList', {

    extend:'Ext.grid.Panel',
    xtype:'userslist',
    hideHeaders:true,
    multiSelect:true,
    scroll:'vertical',
    resizeble: false,
    maxHeight: 150,
    minHeight: 150,
    maxWidth: 200,
    minWidth: 200,

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text:'Name',
                    sortable:false,
                    width: 200,
                    dataIndex:'name'
                }
            ]
        });

        me.callParent(arguments);
    }
});