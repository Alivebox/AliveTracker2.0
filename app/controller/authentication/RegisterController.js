Ext.define('AliveTracker.controller.authentication.RegisterController', {

    extend:"Ext.app.Controller",

    views:[
        'authentication.Register'
    ],

    refs: [
        {
            ref:'registerForm',
            selector:'registerform [itemId=registerFormContainer]'
        },
        {
            ref: 'email',
            selector: 'registerform [itemId=emailRegister]'
        },
        {
            ref: 'password',
            selector: 'registerform [itemId=passwordRegister]'
        }
    ],

    /**
     * Initializes components listeners
     */
    init:function () {
        this.control({
            'registerform':{
                registerAction:this.onRegisterAction

            }
        });
    },
    /**
     * Handles the logic of the register action
     */
    onRegisterAction:function () {
        var tmpRegisterForm = this.getRegisterForm();
        if(tmpRegisterForm.isValid()){
            var tmpUser = tmpRegisterForm.getRecord();
            tmpUser.set('password',Framework.util.MD5Util.calcMD5(tmpUser.getData().password));
            var tmpNewUsersStore = Ext.getStore('users.NewUsers');
            tmpUser.setProxy({
                type: 'restproxy',
                url: AliveTracker.defaults.WebServices.SAVE_USER
            });
            tmpUser.save({
                scope: this,
                success: this.onLoginUser,
                urlOverride: AliveTracker.defaults.WebServices.SAVE_USER
            });
            tmpNewUsersStore.add(tmpUser);
            tmpNewUsersStore.commitChanges();
        }
    },

    onLoginUser: function(){
        var tmpPassword = Framework.util.MD5Util.calcMD5(this.getPassword().value);
        var tmpEmail = this.getEmail().value;
        var tmpLoginUser = Ext.create('AliveTracker.model.authentication.LoginUser',{
            email: tmpEmail,
            password: tmpPassword
        });
        tmpLoginUser.save({
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
    }
});