Ext.define('AliveTracker.model.authentication.LoginUser', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'email',
            type:'string'
        },
        {
            name:'password',
            type:'string'
        },
        {
            name:'permissions',
            type:'array'
        }
    ],
    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.USER_AUTHENTICATION
    }
});