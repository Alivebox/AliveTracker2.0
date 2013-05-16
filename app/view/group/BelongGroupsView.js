Ext.define('AliveTracker.view.group.BelongGroupsView', {

    extend: 'Ext.view.View',
    xtype : 'belonggroupsview',
    requires: ['Ext.data.Store'],
    imageViewSelectionMode: undefined,
    allowDeselect: true,
    trackOver: true,
    itemSelector: 'div.groups-view-div',
    cls: 'x-groups-view',
    autoScroll: true,
    overItemCls: 'x-item-over',

    tpl: [
        '<tpl for=".">',
            '<div class="groups-view-div">',
                '<a href="#groupDetailPage" id="{id}" class="groups-name-labels">{name}</a>',
            '</div>',
        '</tpl>'
    ],

    initComponent: function() {
        this.callParent(arguments);
    }

});



