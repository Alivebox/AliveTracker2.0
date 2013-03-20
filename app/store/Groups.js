Ext.define('AliveTracker.store.Groups', {

    extend: 'Ext.data.Store',

    id: 'groupsStore',
    autoLoad: false,
    model: 'AliveTracker.model.Group',
    proxy: {
        type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
        url:  AliveTracker.defaults.WebServices.GET_HOME_GROUP
    }
});