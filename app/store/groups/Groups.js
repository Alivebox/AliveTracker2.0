Ext.define('AliveTracker.store.groups.Groups', {

    extend: 'Ext.data.Store',

    id: 'groupsStore',
    autoLoad: false,
    model: 'AliveTracker.model.groups.Group'

});