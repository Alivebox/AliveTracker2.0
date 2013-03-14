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
           name:'role',
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