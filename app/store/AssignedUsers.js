Ext.define('AliveTracker.store.AssignedUsers', {

    extend: 'Ext.data.Store',

    id: 'userStore',
    autoLoad: true,
    model: 'AliveTracker.model.User',
    proxy: {
        type: 'ajax',
        url: 'resources/data/assignedUsers.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});