Ext.define('AliveTracker.model.authentication.ProfileForm', {

    extend:'Ext.data.Model',

    idProperty:'id',

    fields:[
        {
            name:'id',
            type:'int'
        },
        {
            name:'email',
            type:'string'
        },
        {
            name:'name',
            type:'string'
        },
        {
            name:'password',
            type:'string'
        }
    ]

});