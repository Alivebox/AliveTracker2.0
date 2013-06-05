Ext.define('AliveTracker.model.authentication.LoginUser', {

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
            name:'password',
            type:'string'
        },
        {
            name:'entity_status',
            type:'int'
        },
        {
            name:'idPermission',
            type:'int'
        },
        {
            name: 'default_group',
            type: 'int'
        }
    ],

    validations: [
        {
            type: 'presence',
            field: 'email',
            message: 'Email is required'
        },
        {
            type: 'email',
            field: 'email',
            message: 'Este campo debe ser una dirección de correo electrónico con el formato "usuario@dominio.com"'
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