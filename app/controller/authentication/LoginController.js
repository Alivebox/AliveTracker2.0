Ext.define('AliveTracker.controller.authentication.LoginController', {

    extend:"Ext.app.Controller",

    views:[
        'authentication.Login'
    ],

    models: [
        'authentication.LoginUser'
    ],

    init:function () {
        this.control({
            'loginform':{
                login:this.onLoginAction,
                showSignUp:this.onSignUpAction,
                showForgotPassword:this.onNavigateToForgotPasswordView
            }
        });
    },

    onLoginAction:function (argUsername,argPassword) {
        argPassword = Framework.util.MD5Util.calcMD5(argPassword);
        var tmpUser = Ext.create('AliveTracker.model.authentication.LoginUser',{
            email: argUsername,
            password: argPassword
        });
        tmpUser.save({
            scope: this,
            success: this.onLoginSuccess,
            urlOverride: AliveTracker.defaults.WebServices.USER_AUTHENTICATION
        });
    },

    onLoginSuccess: function(argRecord){
        var tmpCurrentUser = argRecord;
        tmpCurrentUser = this.addDefaultPermissions(tmpCurrentUser);
        Framework.core.SecurityManager.setCurrentUser(tmpCurrentUser);
        Framework.core.SecurityManager.setCurrentPermissions(tmpCurrentUser.get('permissions'));
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

    onNavigateToForgotPasswordView:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'forgotPasswordPage');
    },

    onSignUpAction:function () {
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'registerPage');
    }

});