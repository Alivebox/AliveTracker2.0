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
            name:'project_name',
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

    validations: [
        {
            type: 'presence',
            field: 'project'
        },
        {
            type: 'presence',
            field: 'activity'
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