Ext.define('AliveTracker.store.Users', {

    extend: 'Ext.data.Store',

    id: 'userStore',
    autoLoad: true,
    model: 'AliveTracker.model.User'

});