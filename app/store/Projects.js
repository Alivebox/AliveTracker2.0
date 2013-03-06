Ext.define('AliveTracker.store.Projects', {

    extend: 'Ext.data.Store',

    id: 'projectsStore',
    autoLoad: false,
    model: 'AliveTracker.model.Project'

});