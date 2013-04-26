Ext.define('AliveTracker.store.users.NewUsers', {

    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'AliveTracker.model.users.User',

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_ALL_USERS
    }

});