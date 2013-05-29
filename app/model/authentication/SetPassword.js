Ext.define('AliveTracker.model.authentication.SetPassword', {

    extend:'Ext.data.Model',

    idProperty:'password',

    fields:[
        {
            name:'password',
            type:'string'
        }
    ],
    proxy: {
        type: 'restproxy',
        url: AliveTracker.defaults.WebServices.SET_PASSWORD
    }
});