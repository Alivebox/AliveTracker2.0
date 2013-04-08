Ext.define('AliveTracker.store.Users', {

    extend: 'Ext.data.Store',

    id: 'userStore',
    autoLoad: false,
    model: 'AliveTracker.model.User',

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_USERS_GROUP_AND_PROJECT
    }

});