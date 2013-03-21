Ext.define('AliveTracker.model.projects.Log', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'group',
            type:'string'
        },
        {
            name:'project',
            type:'id'
        },
        {
            name:'projectLabel',
            type:'string',
            persist: false
        },
        {
            name:'activity',
            type:'string'
        },
        {
            name:'time',
            type:'float'
        }
    ],
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.LOG_CREATE_LOGS
    }
});