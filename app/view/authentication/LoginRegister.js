Ext.define('AliveTracker.view.authentication.LoginRegister', {
    extend:'Ext.container.Container',
    xtype:'loginregister',
    cls: 'loginregister-view-main-container',
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                cls: 'loginregister-forms-container',
                items: [
                    {
                        xtype:'loginform'
                    },
                    {
                        xtype:'registerform'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});