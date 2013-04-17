Ext.define('AliveTracker.controller.header.HeaderController', {

    extend: "Ext.app.Controller",

    views:[
        'header.HeaderView'
    ],

    init: function(){
        this.control({
            'headerview': {
                showUserProfile: this.showUserProfile,
                logout:this.logout
            }
        });
    },

    showUserProfile: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'userProfilePage');
    },

    logout: function(){
        Framework.core.SecurityManager.logOutUser();
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginPage');
    }

});