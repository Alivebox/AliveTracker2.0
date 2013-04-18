Ext.define('AliveTracker.model.User', {

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
            message: 'First name must be at least 8 characters'
        },
        {
            type: 'presence',
            field: 'password',
            message: 'Password is required'
        }
    ],

    proxy: {
        type: 'restproxy',
        url:  AliveTracker.defaults.WebServices.USER_AUTHENTICATION
    }

});