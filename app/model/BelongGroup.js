Ext.define('AliveTracker.model.BelongGroup', {

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
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/belongGroups.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});