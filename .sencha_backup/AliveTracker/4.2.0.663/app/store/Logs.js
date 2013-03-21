Ext.define('AliveTracker.store.Logs', {

    extend: 'Ext.data.Store',

    id: 'logStore',
    autoLoad: false,
    model: 'AliveTracker.model.projects.Log'

});