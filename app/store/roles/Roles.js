Ext.define('AliveTracker.store.roles.Roles', {

    extend: 'Ext.data.Store',

    id: 'roleStore',
    autoLoad: false,
    model: 'AliveTracker.model.roles.Role',
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.GET_ROLES
    }
});