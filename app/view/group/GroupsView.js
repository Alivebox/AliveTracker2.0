Ext.define('AliveTracker.view.group.GroupsView', {

    extend: 'Ext.view.View',
    xtype : 'groupsview',
    requires: ['Ext.data.Store'],
    imageViewSelectionMode: undefined,
    allowDeselect: true,
    trackOver: true,
    itemSelector: 'div.thumb-wrap',
    cls: 'x-groups-view',
    autoScroll: true,
    overItemCls: 'x-item-over',
    selectedItemCls: 'x-item-selected',

    tpl: [
        '<tpl for=".">',
            '<div class="thumb-wrap">',
                '<div class="thumb">',
                    '<a href="#groupDetailPage" id="{id}" class="groups-name-labels">{name}</a>',
                    '<br><br>',
                '</div>',
            '</div>',
        '</tpl>'
    ],

    initComponent: function() {
        this.callParent(arguments);
    },

    onMouseOver: function(){
    }


});



