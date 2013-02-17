Ext.define('AliveTracker.controller.ForgotPasswordController', {

    extend: 'Ext.app.Controller',
    
    views: [
        'user.ForgotPassword'
    ],

    init: function() {
        this.control({
            'forgotpassword': {
                showLoginPage: this.showLoginPage
            }
        });
    },

    showLoginPage: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'loginPage');
    }

});