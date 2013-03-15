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
        type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
        url:  AliveTracker.defaults.WebServices.USER_AUTHENTICATION
    }
});