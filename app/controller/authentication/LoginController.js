Ext.define('AliveTracker.controller.authentication.LoginController', {

    extend:"Ext.app.Controller",

    views:[
        'authentication.Login'
    ],

    refs:[
        {
            ref:'main',
            selector:'main'
        },
        {
            ref:'username',
            selector:'loginform [itemId=userNameLoginView]'
        },
        {
            ref:'password',
            selector:'loginform [itemId=passwordLoginView]'
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
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'forgotPasswordPage');
    },

    /**
     * Handles the logic of the login action
     */
    onLoginAction:function () {
        Framework.core.ModelLocator.username = this.getUsername().value;
        Framework.core.ModelLocator.password = this.getPassword().value;
        Ext.Ajax.request({
            url:AliveTracker.defaults.WebServices.USER_AUTHENTICATION,
            scope: this,
            success: this.onLoginSuccess,
            failure: this.onLoginFailure,
            headers:{
                'username': Framework.core.ModelLocator.username,
                'password': Framework.core.ModelLocator.password
            }
        });
    },

    onLoginSuccess: function(argResponse) {
        Framework.core.ModelLocator.loggedUser = Ext.decode(argResponse.responseText);
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    onLoginFailure: function(){
        this.getUsername().reset();
        this.getUsername().validate(false);
        this.getPassword().reset();
        this.getPassword().validate(false);
    },

    /**
     * Handles the logic of the sign-up action
     */
    onSignUpAction:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'registerPage');
    }



});