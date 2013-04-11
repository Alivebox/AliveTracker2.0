Ext.define('AliveTracker.store.LogReport', {

    extend: 'Ext.data.Store',

    id: 'logReportStore',
    autoLoad: false,
    model: 'AliveTracker.model.reports.ReportForm'

});