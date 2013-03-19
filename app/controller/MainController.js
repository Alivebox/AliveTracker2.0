Ext.define('AliveTracker.controller.MainController', {

    extend: "Ext.app.Controller",

    init: function () {
        Framework.core.ErrorsManager.registerCallbackForError(AliveTracker.defaults.Constants.INVALID_SESSION_ID_ERROR_CODE,this.onInvalidSession,this);
    },

    onInvalidSession: function () {
        this.logOutUser();
    },

    logOutUser: function(){
        Framework.core.SecurityManager.logOutUser();
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginPage');
    }

});