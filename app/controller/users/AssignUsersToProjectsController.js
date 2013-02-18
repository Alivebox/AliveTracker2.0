Ext.define('AliveTracker.controller.users.AssignUsersToProjectsController', {

    extend: "Ext.app.Controller",
    refs:[
        {
            ref:'usersList',
            selector:'userslist'
        },
        {
            ref:'userRolesGrid',
            selector:'userrolesgrid'
        }
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
    init: function(){
        this.control({
            'assignuserstoprojectsview': {
                saveUsersToProjectAction : this.onSaveUsersToProjectChanges,
                cancelUsersToProjectAction : this.onCancelUsersToProjectChanges,
                addUserToProjectButtonAction: this.onAddUserToProjectButtonAction,
                removeUserFromProjectButtonAction: this.onRemoveUserFromProjectButtonAction
            }
        });
    },

    /**This method will save all users assigned to projects changes*/
    onSaveUsersToProjectChanges: function(argPopUp, argWindow){
        var tmpWindow = argWindow;
        debugger;
        tmpWindow.close();
    },

    /**This method will cancel all users assigned to projects changes*/
    onCancelUsersToProjectChanges: function(argWindow){
        var tmpWindow = argWindow;
        debugger;
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