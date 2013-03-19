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
        'AssignedUsers',
        'ProjectDetails'
    ],

    refs:[
        {
            ref:'usersList',
            selector:'assignuserstoprojectsview [name=usersList]'
        },
        {
            ref:'userRolesGrid',
            selector:'assignuserstoprojectsview [name=userrolesgrid]'
        },
        {
            ref:'assignUsersToProjectsView',
            selector:'assignuserstoprojectsview'
        },
        {
            ref:'projectModelForm',
            selector:'assignuserstoprojectsview form[name=projectModelForm]'
        }
    ],

    init: function(){
        this.control({
            'assignuserstoprojectsview': {
                afterrender: this.onAfterRender,
                saveUsersToProjectAction : this.onSaveUsersToProjectChanges,
                cancelUsersToProjectAction : this.onCancelUsersToProjectChanges,
                addUserToProjectButtonAction: this.onAddUserToProjectButtonAction,
                removeUserFromProjectButtonAction: this.onRemoveUserFromProjectButtonAction
            }
        });
    },

    onAfterRender: function(){
        this.onLoadAssignUsersStore();
        this.onLoadProjectForm();
    },

    onLoadAssignUsersStore: function(){
        var tmpAssignedUsersStore = Ext.getStore('AssignedUsers');
        tmpAssignedUsersStore.removeAll();
        var tmpProjectDetailStore = Ext.getStore('ProjectDetails');
        tmpProjectDetailStore.removeAll();
        if(!this.getAssignUsersToProjectsView().insert){
            var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_PROJECTS,3);
            tmpProjectDetailStore.load({
                scope: this,
                urlOverride: tmpUrl,
                callback: this.onLoadProjectStoreResult
            });
        }
    },

    onLoadProjectStoreResult: function(argRecords,argOperation,argSuccess){
        if(argSuccess) {
            var tmpAssignedUsersStore = Ext.getStore('AssignedUsers');
            var tmpUserList = argRecords[0].data.users;
            var tmpProjectDetailStore = Ext.getStore('ProjectDetails');
            tmpProjectDetailStore.add(argRecords[0].data);
            for (var tmpCont = 0; tmpCont <= tmpUserList.length-1; tmpCont++){
                tmpAssignedUsersStore.add(tmpUserList[tmpCont])
            }
        }
    },

    onLoadProjectForm: function(){
        if(!this.getAssignUsersToProjectsView().insert){
            var tmpProjectForm = this.getProjectModelForm();
            var tmpStore = Ext.getStore('ProjectDetails');
            tmpProjectForm.loadRecord(tmpStore.getAt(0));
        }
    },

    /**This method will save all users assigned to projects changes*/
    onSaveUsersToProjectChanges: function(argPopUp, argWindow){
        var tmpAssignedUsersStore = Ext.getStore('AssignedUsers');
        var tmpProjectForm = this.getProjectModelForm().getValues();
        var tmpAssignArray = [];
        for(var tmpCont=0; tmpCont < tmpAssignedUsersStore.data.items.length; tmpCont++){
            tmpAssignArray.push(tmpAssignedUsersStore.data.items[tmpCont].data)
        }
        var tmpProject = Ext.create('AliveTracker.model.Project', {
            name: tmpProjectForm.name,
            description: tmpProjectForm.description,
            users: tmpAssignArray
        });
        tmpProject.setProxy({
            type: AliveTracker.defaults.WebServices.WEB_SERVICE_TYPE,
            url: AliveTracker.defaults.WebServices.SAVE_PROJECT
        });
        tmpProject.save({
            scope: this,
            //FIXME
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.SAVE_PROJECT,3)
        });
        debugger;
        this.onCancelUsersToProjectChanges(argWindow);
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