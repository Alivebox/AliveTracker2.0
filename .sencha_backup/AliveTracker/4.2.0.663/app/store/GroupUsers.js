Ext.define('AliveTracker.store.GroupUsers', {

    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'AliveTracker.model.User',

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_USERS_GROUP
    }

});