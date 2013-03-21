Ext.define('AliveTracker.model.GroupDTO', {

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
    ]

});