Ext.define('AliveTracker.model.projects.Status', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'date',
            type:'date'
        },
        {
            name:'email',
            type:'string'
        }
    ],
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.LOG_SEND_STATUS
    }
});