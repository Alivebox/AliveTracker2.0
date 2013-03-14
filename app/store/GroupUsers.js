Ext.define('AliveTracker.store.GroupUsers', {

    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'AliveTracker.model.User',

    proxy: {
        type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
        url:  AliveTracker.defaults.WebServices.GET_USERS_GROUP
    }

});