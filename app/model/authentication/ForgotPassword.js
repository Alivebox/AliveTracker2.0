Ext.define('AliveTracker.model.authentication.ForgotPassword', {

    extend:'Ext.data.Model',

    idProperty:'email',

    fields:[
        {
            name:'email',
            type:'string'
        },
        {
            name:'token',
            type:'string'
        }
    ],
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.USER_FORGOT_PASSWORD
    }
});