Ext.define('AliveTracker.controller.header.HeaderController', {

    extend: "Ext.app.Controller",

    views:[
        'header.HeaderView'
    ],

    refs: [
        {
            ref: 'userlabel',
            selector: 'headerview [itemId=usernamelabel]'
        }
    ],

    init: function(){
        this.control({
            'headerview': {
                beforeshow: this.showUsername,
                showUserProfile: this.showUserProfile,
                logout:this.logout,
                logoClick: this.showHomePage,
                goHome: this.onGoHome
            }
        });
    },

    showUsername: function(){
        var tmpUserLabel = this.getUserlabel();
        tmpUserLabel.setText(Mercury.core.SecurityManager.getCurrentUsername());
    },

    showUserProfile: function(){
        Mercury.core.EventBus.fireEvent(Mercury.core.Events.EVENT_SHOW_PAGE, 'userProfilePage');
    },

    showHomePage: function(){
        Mercury.core.EventBus.fireEvent(Mercury.core.Events.EVENT_SHOW_PAGE, 'homePage');
    },

    logout: function(){
        var tmpUser = Ext.create('AliveTracker.model.authentication.LoginUser');
        tmpUser.save({
            scope: this,
            success: this.onLogoutSuccess,
            urlOverride: AliveTracker.defaults.WebServices.USER_LOG_OUT
        });

    },

    onGoHome: function(){
        Mercury.core.ViewsManager.reconfigureViewsAndShowPage('groupDetailPage');
    },

    onLogoutSuccess: function(argRecord){
        Mercury.core.SecurityManager.logOutUser();
        Mercury.core.EventBus.fireEvent(Mercury.core.Events.EVENT_SHOW_PAGE, 'loginPage');
    }

});