Ext.define('AliveTracker.store.AssignedUsers', {

    extend: 'Ext.data.Store',

    id: 'userStore',
    autoLoad: false,
    model: 'AliveTracker.model.User',
    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_USERS_PROJECTS
    }
});