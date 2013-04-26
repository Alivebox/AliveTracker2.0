Ext.define('AliveTracker.model.groups.Group', {

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
            name:'web_site_url',
            type:'string'
        },
        {
            name:'users',
            type:'arraylist'
        }
    ]

});