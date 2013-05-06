Ext.define('AliveTracker.controller.users.UserProfileController', {

    extend: "Ext.app.Controller",

    views:[
        'users.UserProfile'
    ],

    refs: [
        {
            ref:'userForm',
            selector:'userprofile [itemId=userform]'
        },
        {
            ref:'password',
            selector:'userprofile [itemId=passwordProfile]'
        },
        {
            ref:'passwordContainer',
            selector:'userprofile [itemId=passwordContainer]'
        }
    ],

    init: function(){
        this.control({
            'userprofile':{
                beforerender: this.onLoadFields,
                editProfile:this.onSaveUserProfile,
                showPasswordField: this.onShowPasswordField
            }
        });
    },

    currentUser: null,

    onLoadFields: function(){
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_ALL_USERS,Framework.core.SecurityManager.getCurrentUsername());
        this.currentUser = Ext.create('AliveTracker.model.users.User',{
            email: Framework.core.SecurityManager.getCurrentUsername()
        });
        this.currentUser.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.GET_ALL_USERS
        })
        this.currentUser.save({
            scope: this,
            success: this.onLoadSuccess,
            urlOverride: tmpUrl
        });
    },

    onLoadSuccess: function(argRecord){
        var tmpForm = this.getUserForm();
        tmpForm.loadRecord(this.currentUser);
    },

    onSaveUserProfile: function(){
        var tmpForm = this.getUserForm();
        var tmpPasswordField = this.getPassword();
        if( tmpForm.isValid() ){
            var tmpRecord = tmpForm.getRecord();
            var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_USER,this.currentUser.getData().id);
            if(!tmpPasswordField.isHidden()){
                this.currentUser.set('password',Framework.util.MD5Util.calcMD5(tmpRecord.getData().password));
            }
            this.currentUser.setProxy({
                type: 'restproxy',
                url: AliveTracker.defaults.WebServices.UPDATE_USER
            })
            this.currentUser.save({
                scope: this,
                urlOverride: tmpUrl
            });
            Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SUCCESS_SAVE_PROFILE);
        }
    },

    onShowPasswordField: function(tmpButton){
        tmpButton.setVisible(false);
        var tmpPasswordContainer = this.getPasswordContainer();
        var tmpPasswordField = this.getPassword();
        tmpPasswordContainer.setVisible(true);
        tmpPasswordField.setValue("");
    }

});