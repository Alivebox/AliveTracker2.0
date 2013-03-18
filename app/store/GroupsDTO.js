Ext.define('AliveTracker.store.GroupsDTO', {

    extend: 'Ext.data.Store',

    id: 'groupsDTOStore',
    autoLoad: false,
    model: 'AliveTracker.model.GroupDTO',
    proxy: {
        type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
        url:  AliveTracker.defaults.WebServices.GET_HOME_GROUP
    }
});