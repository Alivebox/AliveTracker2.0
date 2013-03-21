Ext.define('AliveTracker.store.Users', {

    extend: 'Ext.data.Store',

    id: 'userStore',
    autoLoad: false,
    model: 'AliveTracker.model.User'

});