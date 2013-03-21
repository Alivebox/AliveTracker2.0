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
        },
        {
            name: 'role',
            type: 'string'
        }
    ],

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.USER_AUTHENTICATION
    }

});