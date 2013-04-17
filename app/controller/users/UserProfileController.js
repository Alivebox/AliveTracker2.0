Ext.define('AliveTracker.controller.users.UserProfileController', {

    extend: "Ext.app.Controller",

    views:[
        'users.UserProfile'
    ],

    refs: [
        {
            ref:'name',
            selector:'userprofile [itemId=nameProfile]'
        },
        {
            ref: 'email',
            selector: 'userprofile [itemId=emailProfile]'
        },
        {
            ref: 'password',
            selector: 'userprofile [itemId=passwordProfile]'
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

    onLoadFields: function(){
        var tmpEmail = this.getEmail();
        tmpEmail.setValue(Framework.core.SecurityManager.getCurrentUsername());
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USER,Framework.core.SecurityManager.getCurrentUsername());
        var tmpUser = Ext.create('AliveTracker.model.User',{
            email: tmpEmail
        });
        tmpUser.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.GET_USER
        })
        tmpUser.save({
            scope: this,
            success: this.onLoadSuccess,
            urlOverride: tmpUrl
        });
    },

    onLoadSuccess: function(argRecord){
        var tmpName = this.getName();
        var name = argRecord.getData().name;
        tmpName.setValue(name);
    },

    onSaveUserProfile: function(){
        //var tmpPassword = Framework.util.MD5Util.calcMD5(this.getPassword().value);
        var tmpEmail = this.getEmail().value;
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USER,Framework.core.SecurityManager.getCurrentUsername());
        var tmpUser = Ext.create('AliveTracker.model.User',{
            email: tmpEmail
        });
        tmpUser.save({
            scope: this,
            success: this.onLoginSuccess,
            urlOverride: tmpUrl
        });
    },

    onLoginSuccess: function(argRecord){
        var tmpPassword = this.getPassword().value;
        var tmpName = this.getName().value;
        var tmpEmail = this.getEmail().value;
        var tmpId = argRecord.getId();
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_USER,tmpId);
        if(tmpPassword.length > 0){
            var tmpUser = Ext.create('AliveTracker.model.User',{
                id: tmpId,
                email: tmpEmail,
                name: tmpName
            });
        }
        tmpUser.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.UPDATE_USER
        })
        tmpUser.save({
            scope: this,
            urlOverride: tmpUrl
        });
    },

    onShowPasswordField: function(){
        var tmpPasswordField = this.getPassword();
        tmpPasswordField.setVisible(true);
    }

});