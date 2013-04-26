Ext.define('AliveTracker.store.projects.Projects', {

    extend: 'Ext.data.Store',

    id: 'projectsStore',
    autoLoad: false,
    model: 'AliveTracker.model.projects.Project'

});