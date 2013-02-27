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

    init:function () {
        this.control({
            'loginform':{
                navigateToForgotPasswordView:this.onNavigateToForgotPasswordView,
                loginAction:this.onLoginAction,
                signUpAction:this.onSignUpAction
            }
        });
    },

    onNavigateToForgotPasswordView:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'forgotPasswordPage');
    },

    onLoginAction:function () {
        Framework.core.ModelLocator.username = this.getUsername().value;
        Framework.core.ModelLocator.password = Framework.util.MD5Util.calcMD5(this.getPassword().value);
        Framework.ux.data.RestProxy.setHeaders({
            username: Framework.core.ModelLocator.username,
            password: Framework.core.ModelLocator.password
        });
        var tmpUsersStore = Ext.create('AliveTracker.store.Users');
        tmpUsersStore.load({
            scope: this,
            callback: this.onLoginResult
        });
    },

    onLoginResult: function(argRecords,argOperation,argSuccess){
        if( !argSuccess || Ext.isEmpty(argRecords) ){
            this.loginFailure();
            return;
        }
        Framework.core.ModelLocator.loggedUser = argRecords[0];
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    loginFailure: function(){
        this.getUsername().reset();
        this.getUsername().validate(false);
        this.getPassword().reset();
        this.getPassword().validate(false);
    },

    onSignUpAction:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'registerPage');
    }



});