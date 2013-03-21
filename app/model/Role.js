Ext.define('AliveTracker.model.Role', {

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
        },
        {
            name:'description',
            type:'string'
        }
    ]

});