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
            name:'dateRangeCombo',
            type:'string'
        },
        {
            name:'dateRangeField',
            type:'string'
        }
    ]

});