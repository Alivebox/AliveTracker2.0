Ext.define('AliveTracker.store.users.ProjectUsers', {

    extend: 'Ext.data.Store',

    id: 'projectUserStore',
    autoLoad: false,
    model: 'AliveTracker.model.users.User'
});