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
                //afterrender:this.onVerifyUserLoggued
            }
        });
    },

    onVerifyUserLoggued:function() {
        var tmpUsersStore = Ext.create('AliveTracker.store.Users');
        tmpUsersStore.load({
            scope: this,
            callback: this.onLoginResult,
            urlOverride: AliveTracker.defaults.WebServices.GET_USER_AUTH
        });
    },

    onNavigateToForgotPasswordView:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'forgotPasswordPage');
    },

    onLoginAction:function () {
        var tmpUsername = this.getUsername().value;
        var tmpPassword = Framework.util.MD5Util.calcMD5(this.getPassword().value);
        Framework.core.SecurityManager.setUsernameAndPassword(tmpUsername,tmpPassword);
        var tmpUsersStore = Ext.create('AliveTracker.store.Users');
        tmpUsersStore.load({
            scope: this,
            callback: this.onLoginResult,
            urlOverride: AliveTracker.defaults.WebServices.USER_AUTHENTICATION
        });
    },

    onLoginResult: function(argRecords,argOperation,argSuccess){
        if( !argSuccess || Ext.isEmpty(argRecords) ){
            this.loginFailure();
            return;
        }
        var tmpCurrentUser = argRecords[0];
        tmpCurrentUser = this.addDefaultPermissions(tmpCurrentUser);
        Framework.core.SecurityManager.setCurrentUser(tmpCurrentUser);
        Framework.core.SecurityManager.setPermissions(tmpCurrentUser.get('permissions'));
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    addDefaultPermissions: function(argUser){
        if( Ext.isEmpty(argUser) ){
            return null;
        }
        var tmpDefaultPermissions = [
            'viewHome',
            'viewGroupDetail'
        ];
        argUser.set('permissions',tmpDefaultPermissions);
        return argUser;
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