Ext.define('AliveTracker.view.group.GroupsView', {

    extend: 'Ext.view.View',
    xtype : 'groupsview',
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
            '<div id="div{id}" name="{id}" class="groups-view-div">',
                '<a href="#groupDetailPage" id="{id}" class="groups-name-labels">{name}</a>',
                '<div id="divButtons{id}" class="div-groups-buttons" hidden=true>',
                    '<button type="button" class="groups-edit-button" id="btnEdit{id}" name="{id}"></button>',
                    '<button type="button" class="groups-delete-button" id="btnDelete{id}" name="{id}"></button>',
                '</div>',
            '</div>',
        '</tpl>'
    ],

    initComponent: function() {
        this.callParent(arguments);
    }

});



