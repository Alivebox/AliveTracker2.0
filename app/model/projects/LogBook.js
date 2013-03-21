Ext.define('AliveTracker.model.projects.LogBook', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'date',
            type:'date'
        },
        {
            name:'group',
            type:'string'
        },
        {
            name:'activities',
            type:'array'
        }
    ],
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.LOG_CREATE_LOGS
    }
});