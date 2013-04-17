Ext.define('AliveTracker.model.reports.Report', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'project',
            type:'string'
        },
        {
            name:'activity',
            type:'string'
        },
        {
            name:'date',
            type:'string'
        }
    ],

    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.LOG_LIST_REPORT
    }
});