Ext.define('AliveTracker.store.projects.ProjectDetails', {

    extend: 'Ext.data.Store',

    id: 'projectDetailsStore',
    autoLoad: false,
    model: 'AliveTracker.model.projects.Project'

});