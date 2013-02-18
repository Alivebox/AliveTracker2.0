Ext.define('AliveTracker.model.Group', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'name',
            type:'string'
        },
        {
            name:'description',
            type:'string'
        },
        {
            name:'logoUrl',
            type:'string'
        },
        {
            name:'webSiteUrl',
            type:'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/groups.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});