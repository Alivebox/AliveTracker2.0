Ext.define('AliveTracker.store.Roles', {

    extend: 'Ext.data.Store',

    id: 'roleStore',
    autoLoad: false,
    model: 'AliveTracker.model.Role',
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.GET_ROLES
    }
});