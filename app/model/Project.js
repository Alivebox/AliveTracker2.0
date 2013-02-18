Ext.define('AliveTracker.model.Project', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'name',
            type:'string'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/projects.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});