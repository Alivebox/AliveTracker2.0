Ext.define('AliveTracker.view.Viewport', {

    extend:'Ext.container.Viewport',
    renderTo:Ext.getBody(),

    items:[
        {
            xtype: 'label',
            text: 'AliveTracker2.0'
        }
    ]
});