Ext.define('AliveTracker.controller.users.AssignUsersToProjectsController', {

    extend: "Ext.app.Controller",

    views: [
        'users.AssignUsersToProjects',
        'users.UserRolesAssignmentPopUp',
        'users.UserRolesGrid',
        'users.UsersGrid',
        'users.UsersList'
    ],

    models:[
        'User',
        'Role'
    ],

    stores:[
        'Users',
        'Roles',
        'AssignedUsers'
    ],

    refs:[
        {
            ref:'usersList',
            selector:'assignuserstoprojectsview [name=usersList]'
        },
        {
            ref:'userRolesGrid',
            selector:'userrolesgrid'
        }
    ],

    init: function(){
        this.control({
            'assignuserstoprojectsview': {
                saveUsersToProjectAction : this.onSaveUsersToProjectChanges,
                cancelUsersToProjectAction : this.onCancelUsersToProjectChanges,
                addUserToProjectButtonAction: this.onAddUserToProjectButtonAction,
                removeUserFromProjectButtonAction: this.onRemoveUserFromProjectButtonAction,
                afterrender: this.onAfterRender
            }
        });
    },


    onAfterRender:function() {
        this.onLoadUserListStore()
    },

    onLoadUserListStore: function() {
        var tmpUsersGroupStore = Ext.create('AliveTracker.store.Users');
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride: AliveTracker.defaults.WebServices.GET_USERS_GROUP + AliveTracker.defaults.WebServices.GROUP_ID,
            callback: function(){}
        });
        this.getUsersList().store = tmpUsersGroupStore;
    },

    /**This method will save all users assigned to projects changes*/
    onSaveUsersToProjectChanges: function(argPopUp, argWindow){
        var tmpWindow = argWindow;
        tmpWindow.close();
    },

    /**This method will cancel all users assigned to projects changes*/
    onCancelUsersToProjectChanges: function(argWindow){
        var tmpWindow = argWindow;
        tmpWindow.close();
    },

    /**
     * Handles the logic of the add user to project button
     */
    onAddUserToProjectButtonAction: function(){
        if(this.getUsersList().getSelectionModel().hasSelection()){
            var tmpUsersRolesStore = this.getUserRolesGrid().getStore();
            var tmpUsersListStore = this.getUsersList().getStore();
            var tmpSelectionArray = this.getUsersList().getSelectionModel().getSelection();
            for (var i=0; i < tmpSelectionArray.length; i++) {
                tmpUsersRolesStore.add(tmpSelectionArray[i]);
                tmpUsersListStore.remove(tmpSelectionArray[i]);
            }
        }
    },

    /**
     * Handles the logic of the remove user from project button
     */
    onRemoveUserFromProjectButtonAction: function(){
        if(this.getUserRolesGrid().getSelectionModel().hasSelection()){
            var tmpUsersListStore = this.getUsersList().getStore();
            var tmpUsersRolesStore = this.getUserRolesGrid().getStore();
            var tmpSelectionArray = this.getUserRolesGrid().getSelectionModel().getSelection();
            for (var i=0; i < tmpSelectionArray.length; i++) {
                tmpUsersListStore.add(tmpSelectionArray[i]);
                tmpUsersRolesStore.remove(tmpSelectionArray[i]);
            }
        }
    }
});