Ext.define('AliveTracker.store.users.LoginUsers', {

    extend: 'Ext.data.Store',

    id: 'loginUserStore',
    autoLoad: false,
    model: 'AliveTracker.model.authentication.LoginUser',

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS
    }

});