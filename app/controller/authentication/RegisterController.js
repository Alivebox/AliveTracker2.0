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
                registerClick:this.registerUser

            }
        });
    },
    /**
     * Handles the logic of the register action
     */
    registerUser:function () {
        var tmpRegisterForm = this.getRegisterForm();
        var tmpNewUsersStore = Ext.getStore('users.NewUsers');
        if(tmpRegisterForm.isValid()){
            var tmpUser = tmpRegisterForm.getRecord();
            tmpUser.set('password',Framework.util.MD5Util.calcMD5(tmpUser.getData().password));
            tmpUser.setProxy({
                type: 'restproxy',
                url: AliveTracker.defaults.WebServices.SAVE_USER
            });
            tmpUser.save({
                scope: this,
                success: this.onRegisterLoginSuccess,
                urlOverride: AliveTracker.defaults.WebServices.SAVE_USER
            });
            tmpNewUsersStore.add(tmpUser);
            tmpNewUsersStore.commitChanges();
        }
    },

    onRegisterLoginSuccess: function(argRecord){
        var tmpCurrentUser = argRecord;
        tmpCurrentUser = this.addDefaultPermissions(tmpCurrentUser);
        Framework.core.SecurityManager.setCurrentUsername(tmpCurrentUser.get('email'));
        Framework.core.SecurityManager.setCurrentPermissions(tmpCurrentUser.get('permissions'));
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