Ext.define('AliveTracker.store.reports.LogReport', {

    extend: 'Ext.data.Store',

    id: 'logReportStore',
    autoLoad: false,
    model: 'AliveTracker.model.reports.ReportForm'

});