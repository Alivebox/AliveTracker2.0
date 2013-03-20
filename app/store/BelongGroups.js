Ext.define('AliveTracker.store.BelongGroups', {

    extend: 'Ext.data.Store',

    id: 'belongGroupsStore',
    autoLoad: false,
    model: 'AliveTracker.model.BelongGroup',
    proxy: {
        type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
        url:  AliveTracker.defaults.WebServices.GET_HOME_GROUP
    }

});