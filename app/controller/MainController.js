Ext.define('AliveTracker.controller.MainController', {

    extend: "Ext.app.Controller",

    init: function () {
        Mercury.core.ErrorsManager.registerCallbackForError(AliveTracker.defaults.Constants.INVALID_SESSION_ID_ERROR_CODE,this.onInvalidSession,this);
    },

    onInvalidSession: function () {
        this.logOutUser();
    },

    logOutUser: function(){
        Mercury.core.SecurityManager.logOutUser();
        Mercury.core.EventBus.fireEvent(Mercury.core.Events.EVENT_SHOW_PAGE, 'loginPage');
    }

});