Ext.define('AliveTracker.model.reports.ReportForm', {

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
            type:'string'
        },
        {
            name:'user',
            type:'string'
        },
        {
            name:'dateRangeOption',
            type:'string'
        },
        {
            name:'startDate',
            type:'string'
        },
        {
            name:'endDate',
            type:'string'
        }

    ],

    validations: [
        {
            type: 'presence',
            field: 'project'
        },
        {
            type: 'presence',
            field: 'user'
        }
    ],

    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.LOG_EXPORT_REPORT
    }
});