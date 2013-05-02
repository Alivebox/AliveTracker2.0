Ext.define('AliveTracker.controller.header.HeaderController', {

    extend: "Ext.app.Controller",

    views:[
        'header.HeaderView'
    ],

    init: function(){
        this.control({
            'headerview': {
                showUserProfile: this.showUserProfile,
                logout:this.logout,
                logoClick: this.showHomePage
            }
        });
    },

    showUserProfile: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'userProfilePage');
    },

    showHomePage: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    logout: function(){
        var tmpUser = Ext.create('AliveTracker.model.authentication.LoginUser');
        tmpUser.save({
            scope: this,
            success: this.onLogoutSuccess,
            urlOverride: AliveTracker.defaults.WebServices.USER_LOG_OUT
        });

    },

    onLogoutSuccess: function(argRecord){
        Framework.core.SecurityManager.logOutUser();
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'loginPage');
    }

});