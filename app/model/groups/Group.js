Ext.define('AliveTracker.model.groups.Group', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int',
            defaultValue:undefined
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
        },
        {
            name: 'default_group',
            type: 'boolean'
        }
    ],

    validations: [
        {
            type: 'presence',
            field: 'name'
        },
        {
            type: 'presence',
            field: 'description'
        }
    ],

    proxy:{
        type:'restproxy',
        url:AliveTracker.defaults.WebServices.SAVE_GROUP
    }
});