Ext.define('AliveTracker.store.LogBook', {

    extend: 'Ext.data.Store',

    id: 'logBookStore',
    autoLoad: true,
    model: 'AliveTracker.model.projects.LogBook'

});