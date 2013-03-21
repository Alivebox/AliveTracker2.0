Ext.define('AliveTracker.model.Role', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'role',
            type:'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/roles.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});