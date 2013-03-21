Ext.define('AliveTracker.store.Groups', {

    extend: 'Ext.data.Store',

    id: 'groupsStore',
    autoLoad: false,
    model: 'AliveTracker.model.Group',
    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_HOME_GROUP
    }
});