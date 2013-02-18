Ext.define('AliveTracker.model.projects.LogBook', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'datepicker',
            type:'date',
            dateFormat: 'c'

        },
        {
            name:'group',
            type:'string'
        },
        {
            name:'project',
            type:'string'
        },
        {
            name:'txtActivity',
            type:'string'
        },
        {
            name:'time',
            type:'float'
        }
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/data/logBook.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});