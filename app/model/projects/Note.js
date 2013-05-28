Ext.define('AliveTracker.model.projects.Note', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'log',
            type:'int'
        },
        {
            name:'note',
            type:'string'
        },
        {
            name: 'action',
            type: 'int'
        }
    ],

    validations: [
        {
            type: 'presence',
            field: 'note'
        }
    ],

    proxy: {
        type: 'restproxy',
        api: {
            create: AliveTracker.defaults.WebServices.LOG_CREATE_LOGS,
            destroy: AliveTracker.defaults.WebServices.LOG_DELETE
        }
    }
});