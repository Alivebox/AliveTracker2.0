Ext.define('AliveTracker.model.groups.BelongGroup', {

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
        },
        {
            name:'logo_url',
            type:'string'
        },
        {
            name: 'default_group',
            type: 'boolean'
        }
    ]

});