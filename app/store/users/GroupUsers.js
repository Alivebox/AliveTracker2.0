Ext.define('AliveTracker.store.users.GroupUsers', {

    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'AliveTracker.model.users.User',

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_USERS_GROUP
    }

});