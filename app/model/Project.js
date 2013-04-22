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
        },
        {
            name:'description',
            type:'string'
        },
        {
            name:'created',
            type:'string'
        },
        {
            name:'users',
            type:'arraylist'
        }
    ],

    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.GET_PROJECTS + AliveTracker.defaults.WebServices.GROUP_ID
    }
});