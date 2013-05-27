Ext.define('AliveTracker.store.projects.Notes', {

    extend: 'Ext.data.Store',

    id: 'noteStore',
    autoLoad: false,
    model: 'AliveTracker.model.projects.Note'

});