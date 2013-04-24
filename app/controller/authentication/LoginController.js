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
                beforerender: this.onBeforeRender,
                login:this.onLoginAction
            }
        });
    },

    onBeforeRender: function(){
        this.validateIfUserAlreadyLogged();
    },

    validateIfUserAlreadyLogged: function(){
        if( !Framework.core.SecurityManager.isUserLogged()){
            return;
        }
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
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
        Framework.core.SecurityManager.setCurrentUsername(tmpCurrentUser.get('email'));
        Framework.core.SecurityManager.setCurrentPermissions(tmpCurrentUser.get('permissions'));

        if(argRecord.data.entity_status === AliveTracker.defaults.Constants.TO_CHANGE_PASSWORD){
            Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.RESET_PASSWORD_UPDATE);
            Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'userProfilePage');
            return;
        }
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

//    onShowForgotPasswordPopup:function () {
//        this.forgotPasswordPopup = Ext.create('AliveTracker.view.authentication.ForgotPassword');
//        this.forgotPasswordPopup.title = Locales.AliveTracker.FORGOT_PASSWORD_LABEL;
//        this.forgotPasswordPopup.show();
//    }

});