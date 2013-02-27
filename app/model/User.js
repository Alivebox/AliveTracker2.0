Ext.define('AliveTracker.model.User', {

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
            name:'email',
            type:'string'
        }
    ],

    proxy: {
        type: 'restproxy',
        url: '/ws/alivews/main/'
    }

});