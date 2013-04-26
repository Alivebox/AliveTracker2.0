Ext.define('AliveTracker.store.users.Users', {

    extend: 'Ext.data.Store',

    id: 'userStore',
    autoLoad: false,
    model: 'AliveTracker.model.users.User',

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_USERS_GROUP_AND_PROJECT
    }

});