Ext.define('AliveTracker.store.GroupsDTO', {

    extend: 'Ext.data.Store',

    id: 'groupsDTOStore',
    autoLoad: false,
    model: 'AliveTracker.model.GroupDTO',
    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_HOME_GROUP
    }
});