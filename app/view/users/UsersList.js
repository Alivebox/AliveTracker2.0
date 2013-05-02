Ext.define('AliveTracker.view.users.UsersList', {

    extend:'Ext.grid.Panel',
    xtype:'userslist',
    cls: 'userlist-container',
    hideHeaders:true,
    multiSelect:true,
    scroll:'vertical',
    resizeble: false,
    maxHeight: 150,
    minHeight: 150,
    maxWidth: 225,
    minWidth: 225,

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            columns:[
                {
                    xtype:'gridcolumn',
                    menuDisabled:true,
                    text:Locales.AliveTracker.USERS_LABEL_NAME,
                    sortable:false,
                    width: 200,
                    dataIndex:'name'
                }
            ]
        });

        me.callParent(arguments);
    }
});