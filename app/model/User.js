Ext.define('AliveTracker.model.User', {

    extend:'Ext.data.Model',

    idProperty:'name',

    fields:[
        {
            name:'name',
            type:'string'
        },
        {
            name:'role',
            type:'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/users.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});