Ext.define('AliveTracker.model.groups.GroupDTO', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'belongToGroups',
            type:'arraylist'
        },
        {
            name:'myGroups',
            type:'arraylist'
        }
    ],

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.GET_GROUPS_BY_USER
    }

});