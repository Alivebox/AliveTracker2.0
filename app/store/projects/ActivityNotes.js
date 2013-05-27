Ext.define('AliveTracker.store.projects.ActivityNotes', {

    extend: 'Ext.data.Store',

    id: 'activityNoteStore',
    autoLoad: false,
    model: 'AliveTracker.model.projects.Note'

});