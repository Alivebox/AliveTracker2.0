Ext.define('AliveTracker.model.users.User', {

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
            name:'email',
            type:'string'
        },
        {
            name:'password',
            type:'string'
        },
        {
            name: 'role',
            type: 'string'
        }
    ],

    validations: [
        {
            type: 'presence',
            field: 'name'
        },
        {
            type: 'length',
            field: 'password',
            min: 8,
            message: 'Password must be at least 8 characters'
        }
    ],

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.USER_AUTHENTICATION
    }

});