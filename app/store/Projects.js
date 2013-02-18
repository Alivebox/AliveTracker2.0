Ext.define('AliveTracker.store.Projects', {

    extend: 'Ext.data.Store',

    id: 'projectsStore',
    autoLoad: true,
    model: 'AliveTracker.model.Project'

});