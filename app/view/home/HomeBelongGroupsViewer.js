Ext.define('AliveTracker.view.home.HomeBelongGroupsViewer', {

    extend:'Ext.view.View',
    xtype:'homebelonggroupsviewer',
    requires : [
        'Ext.ux.DataView.DragSelector'
    ],
    initComponent: function(){
        Ext.applyIf(this,{
            tpl: [
                '<tpl for=".">',
                '<div style="margin-bottom: 10px;width: 60px;height: 60px; float: left;" class="thumb-wrap">' +
                    '<div class="thumb"> ' +
                    '<img id="{id}" class="belongGroupImage" src="http://src.sencha.io/60/60/{logoUrl}" title="{description}"/>' +
                    '</div>',
                        '<label for="name">{name}</label>' +
                    '</div>' +
                '</tpl>' +
                    '<div class="x-clear"></div></br></br>'
            ],
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No groups created',
            trackOver: true,
            overItemCls: 'x-item-over',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {})
            ]
        });
        this.callParent(arguments);
    }

});