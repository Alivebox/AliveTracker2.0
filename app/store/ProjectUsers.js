Ext.define('AliveTracker.store.ProjectUsers', {

    extend: 'Ext.data.Store',

    id: 'projectUserStore',
    autoLoad: false,
    model: 'AliveTracker.model.User'
});