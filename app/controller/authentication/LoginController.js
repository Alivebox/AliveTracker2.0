Ext.define('AliveTracker.controller.authentication.LoginController', {

    extend:"Ext.app.Controller",

    views:[
        'authentication.LoginRegister',
        'authentication.Login'
    ],

    refs: [
        {
            ref:'loginForm',
            selector:'loginform [itemId=loginFormContainer]'
        }
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
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'groupDetailPage');
    },

    onLoginAction:function () {
        var tmpLoginForm = this.getLoginForm();
        if(tmpLoginForm.isValid()){
            var tmpUser = tmpLoginForm.getRecord();
            tmpUser.set('password',Framework.util.MD5Util.calcMD5(tmpUser.getData().password));
            tmpUser.save({
                scope: this,
                success: this.onLoginSuccess,
                urlOverride: AliveTracker.defaults.WebServices.USER_AUTHENTICATION
            });
        }
    },

    onLoginSuccess: function(argRecord){
        var tmpCurrentUser = argRecord;
        tmpCurrentUser = this.addDefaultPermissions(tmpCurrentUser);
        Framework.core.SecurityManager.logInUser(tmpCurrentUser.get('email'),tmpCurrentUser.get('permissions'));
        if(argRecord.data.entity_status === AliveTracker.defaults.Constants.TO_CHANGE_PASSWORD){
            Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.RESET_PASSWORD_UPDATE);
            Framework.core.ViewsManager.reconfigureViewsAndShowPage('userProfilePage');
            return;
        }
        Framework.core.ViewsManager.reconfigureViewsAndShowPage('groupDetailPage');
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
    }

});