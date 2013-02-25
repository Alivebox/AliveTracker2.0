Ext.define('AliveTracker.controller.authentication.LoginController', {

    extend:"Ext.app.Controller",

    views: [
        'authentication.Login'
    ],

    refs: [
        {
            ref: 'main',
            selector: 'main'
        },
        {
            ref: 'username',
            selector: 'loginform [itemId=userNameLoginView]'
        },
        {
            ref: 'password',
            selector: 'loginform [itemId=passwordLoginView]'
        }
    ],

    /**
     * Initializes components listeners
     */
    init:function () {
        this.control({
            'loginform':{
                navigateToForgotPasswordView:this.onNavigateToForgotPasswordView,
                loginAction:this.onLoginAction,
                signUpAction:this.onSignUpAction
            }
        });
    },

    /**
     * Changes current view to ForgotPassword view
     */
    onNavigateToForgotPasswordView:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'forgotPasswordPage');
    },

    /**
     * Handles the logic of the login action
     */
    onLoginAction:function () {
        var tmpUsername = this.getUsername().value;
        var tmpPassword = this.getPassword().value;
        debugger;
        Ext.Ajax.request({
            url: AliveTracker.defaults.WebServices.USER_AUTHENTICATION + tmpPassword+'/'+tmpUsername+'/?format=json',
            success: function(response){
                debugger;
                var text = response.responseText;
            },
            failure:    function() {
                debugger;
            }
        });

        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'homePage');
    },

    /**
     * Handles the logic of the sign-up action
     */
    onSignUpAction:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'registerPage');
    }



});