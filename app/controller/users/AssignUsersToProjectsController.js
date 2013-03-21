Ext.define('AliveTracker.controller.users.AssignUsersToProjectsController', {

    extend: "Ext.app.Controller",

    views: [
        'users.AssignUsersToProjects',
        'users.UserRolesAssignmentPopUp',
        'users.UserRolesGrid',
        'users.UsersGrid',
        'users.UsersList'
    ],
    insert: true,
    models:[
        'User',
        'Role'
    ],

    stores:[
        'Users',
        'Roles',
        'AssignedUsers',
        'ProjectDetails',
        'ProjectUsers'
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
        AliveTracker.assignUsersToProjectsController = this;
        this.control({
            'assignuserstoprojectsview': {
                afterrender: this.onAfterRender,
                saveUsersToProjectAction : this.onSubmitProjectAction,
                cancelUsersToProjectAction : this.onCancelUsersToProjectChanges,
                addUserToProjectButtonAction: this.onAddUserToProjectButtonAction,
                removeUserFromProjectButtonAction: this.onRemoveUserFromProjectButtonAction
            }
        });
    },

    onAfterRender: function(){
        this.onLoadAssignUsersStore();
        this.onLoadRolesStore();
    },

    onLoadRolesStore: function(){
        var tmpRoleStore = Ext.getStore('Roles');
        var tmpUrlOverride = AliveTracker.defaults.WebServices.GET_ROLES;
        tmpRoleStore.load({
            scope: this,
            urlOverride: tmpUrlOverride
        });
    },

    onLoadAssignUsersStore: function(){
        var tmpAssignedUsersStore = Ext.getStore('AssignedUsers');
        tmpAssignedUsersStore.removeAll();
        var tmpProjectDetailStore = Ext.getStore('ProjectDetails');
        tmpProjectDetailStore.removeAll();
        var tmpProjectUsers = Ext.getStore('ProjectUsers');
        tmpProjectUsers.removeAll();
        if(!this.insert){
            var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_PROJECTS,Ext.state.Manager.get('projectId'));
            tmpProjectDetailStore.load({
                scope: this,
                urlOverride: tmpUrl,
                callback: this.onLoadProjectStoreResult
            });
        }
        else {
            var tmpGroupUsers = Ext.getStore('GroupUsers');
            for(var tmpCont=0; tmpCont < tmpGroupUsers.data.items.length; tmpCont++){
                var tmpUser = tmpGroupUsers.data.items[tmpCont].data;
                tmpProjectUsers.add(tmpUser);
                tmpProjectUsers.commitChanges();
            }
        }
    },

    onLoadProjectStoreResult: function(argRecords,argOperation,argSuccess){
        if(argSuccess) {
            var tmpAssignedUsersStore = Ext.getStore('AssignedUsers');
            var tmpUserList = argRecords[0].data.users;
            var tmpProjectDetailStore = Ext.getStore('ProjectDetails');
            var tmpProjectUsers = Ext.getStore('ProjectUsers');
            var tmpGroupUsers = Ext.getStore('GroupUsers');
            tmpProjectDetailStore.add(argRecords[0].data);
            for (var tmpCont = 0; tmpCont <= tmpUserList.length-1; tmpCont++){
                tmpAssignedUsersStore.add(tmpUserList[tmpCont])
            }
            for(var tmpCont=0; tmpCont < tmpGroupUsers.data.items.length; tmpCont++){
                var tmpUser = tmpGroupUsers.data.items[tmpCont].data;
                if(tmpAssignedUsersStore.getById(tmpUser.id) == null){
                    tmpProjectUsers.add(tmpUser);
                    tmpProjectUsers.commitChanges();
                }

            }
        }
    },

    onSubmitProjectAction: function(argPopUp, argWindow){
        if(this.insert){
            this.onSaveUsersToProjectChanges(argPopUp, argWindow);
            return;
        }
        this.onUpdateUsersToProjectChanges(argPopUp, argWindow);
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
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.SAVE_PROJECT
        });
        tmpProject.save({
            scope: this,
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.SAVE_PROJECT,Ext.state.Manager.get('groupId'))
        });
        var tmpProjectStore = Ext.getStore('Projects')
        tmpProjectStore.add(tmpProject);
        tmpProjectStore.commitChanges();
        this.onCancelUsersToProjectChanges(argWindow);
    },

    onUpdateUsersToProjectChanges: function(argPopUp, argWindow){
        debugger;
        var tmpAssignedUsersStore = Ext.getStore('AssignedUsers');
        var tmpProjectForm = this.getProjectModelForm().getValues();
        var tmpAssignArray = [];
        for(var tmpCont=0; tmpCont < tmpAssignedUsersStore.data.items.length; tmpCont++){
            tmpAssignArray.push(tmpAssignedUsersStore.data.items[tmpCont].data)
        }
        var tmpProjectModel = this.getProjectModelForm().getRecord();
        var tmpProject = Ext.create('AliveTracker.model.Project', {
            id: tmpProjectModel.data.id,
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
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.SAVE_PROJECT,Ext.state.Manager.get('groupId'))
        });
        var tmpProjectStore = Ext.getStore('Projects')
        tmpProjectStore.updateRecord(tmpProject);
        tmpProjectStore.commitChanges();
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