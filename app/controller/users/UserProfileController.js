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
        }
    ],

    init: function(){
        this.control({
            'userprofile':{
                loadFields: this.onLoadFields,
                editProfile:this.onSaveUserProfile,
                showPasswordField: this.onShowPasswordField
            }
        });
    },

    tmpUser: null,

    onLoadFields: function(){
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USER,Framework.core.SecurityManager.getCurrentUsername());
        this.tmpUser = Ext.create('AliveTracker.model.User',{
            email: Framework.core.SecurityManager.getCurrentUsername()
        });
        this.tmpUser.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.GET_USER
        })
        this.tmpUser.save({
            scope: this,
            success: this.onLoadSuccess,
            urlOverride: tmpUrl
        });
    },

    onLoadSuccess: function(argRecord){
        var tmpForm = this.getUserForm();
        var tmpPasswordField = this.getPassword();
        tmpForm.loadRecord(this.tmpUser);
        tmpPasswordField.setValue("");
    },

    onSaveUserProfile: function(){
        var tmpForm = this.getUserForm();
        var tmpRecord = tmpForm.getRecord();
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_USER,this.tmpUser.getData().id);
        this.tmpUser.set('password',Framework.util.MD5Util.calcMD5(tmpRecord.getData().password));
        this.tmpUser.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.UPDATE_USER
        })
        this.tmpUser.save({
            scope: this,
            urlOverride: tmpUrl
        });
    },

    onShowPasswordField: function(){
        var tmpPasswordField = this.getPassword();
        tmpPasswordField.setVisible(true);
    }

});