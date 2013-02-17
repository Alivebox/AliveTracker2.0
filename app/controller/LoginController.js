Ext.define('AliveTracker.controller.LoginController', {

    extend: 'Ext.app.Controller',
    
    views: [
    	'user.Login'
    ],
    
    init: function() {
        this.control({
            'login': {
                showForgotPasswordPage: this.showForgotPasswordPage
            }
        });
    },

    showForgotPasswordPage: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'forgotPasswordPage');
    }
    
});