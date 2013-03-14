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
        type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
        url: AliveTracker.defaults.WebServices.GET_PROJECTS + AliveTracker.defaults.WebServices.GROUP_ID
    }
});