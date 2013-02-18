Ext.define('AliveTracker.controller.authentication.ProfileController', {

    extend:"Ext.app.Controller",
    requires:[
        'AliveTracker.view.authentication.Profile'
    ],
    refs:[
        {
            ref:'profileform',
            selector:'profileform'
        }
    ],

    /**
     * Initializes components listeners
     */
    init:function () {
        this.control({
            'profileform':{
                saveAction:this.onSaveAction,
                cancelAction:this.onCancelAction
            }
        });
    },

    /**
     * Saves de data of the current profile
     */
    onSaveAction:function (argEventSender) {
        var tmpProfileFormBasic = this.getProfileform().getForm();
        if( !tmpProfileFormBasic.isValid() ){
            return;
        }
        var tmpModel = Ext.create('AliveTracker.model.authentication.ProfileForm');
        tmpProfileFormBasic.updateRecord(tmpModel);
    },

    /**
     * Cancels all information of the profile edition
     */
    onCancelAction:function () {
        debugger;
    }



});