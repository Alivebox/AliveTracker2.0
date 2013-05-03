Ext.define('AliveTracker.controller.group.GroupDetailController', {

    extend: "Ext.app.Controller",

    views:[
        'group.GroupDetail',
        'projects.GroupProjects',
        'projects.ProjectsGrid',
        'users.UserRolesAssignmentPopUp'
    ],

    requires : [
        'AliveTracker.view.users.UsersGrid',
        'AliveTracker.view.projects.GroupProjects'
    ],

    models:[
        'users.User',
        'roles.Role'
    ],

    stores:[
        'users.Users',
        'users.AssignedUsers',
        'users.ProjectUsers',
        'roles.Roles'
    ],

    refs: [
        {
            ref:'assignUsersToProjectsView',
            selector:'assignuserstoprojectsview'
        },
        {
            ref:'projectModelForm',
            selector:'assignuserstoprojectsview form[name=projectModelForm]'
        },
        {
            ref:'usersTab',
            selector:'groupdetailform [itemId=usersTab]'
        },
        {
            ref:'GroupTab',
            selector:'groupdetailform [itemId=GroupTab]'
        }
    ],

    init: function(){
        this.control(
            {
                'groupdetailform': {
                    beforerender : this.loadPermissionsStore
                },
                'groupprojects': {
                    addProject : this.onShowProjectPopUp
                },
                'actioncolumn#projectGridActionId': {
                    click: this.onProjectGridActionIdAction
                }
            });
    },

    loadPermissionsStore: function(){
        var tmpLoginUsersStore = Ext.getStore('users.LoginUsers');
        if(!this.isEmpty(tmpLoginUsersStore)){
            var tmpIdPermission = tmpLoginUsersStore.getAt(0).getData().idpermission;
            this.setPermissions(tmpIdPermission);
            return;
        }
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS,Ext.state.Manager.get('groupId'));
        tmpLoginUsersStore.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS
        });
        tmpLoginUsersStore.load({
            scope: this,
            urlOverride:  tmpUrl,
            callback: this.getPermissionId
        });
    },

    getPermissionId: function(argRecord){
        var tmpIdPermission = argRecord[0].getData().idpermission;
        this.setPermissions(tmpIdPermission);
    },

    isEmpty: function(argStore){
        var tmpStore = Ext.getStore(argStore);
        if(tmpStore.getCount() > 0){
            return false;
        }
        return true;
    },

    setPermissions: function(argRecord){
        if(!this.userHasAllPermissions(argRecord)){
            this.getGroupTab().setTabsToDisableByIndexes(1,true);
            this.getGroupTab().setTabsToDisableByIndexes(2,true);
        }
    },

    userHasAllPermissions: function(argRecord){

        if(argRecord == 1){
            return true;
        }
        return false;
    },

    onProjectGridActionIdAction: function(argGrid,argCell,argRow,argCol,argEvent) {
        var tmpRec = argGrid.getStore().getAt(argRow);
        var tmpAction = argEvent.target.getAttribute('class');
        if (tmpAction.indexOf("x-action-col-0") != -1) {
            this.showEditProjectPopUp(argGrid,argRow);
        }
        else if (tmpAction.indexOf("x-action-col-1") != -1) {
            this.onConfirmDeleteProject(argGrid,argRow);
        }

    },

    showEditProjectPopUp: function(argGrid,argRow){
        var tmpProjectModel = argGrid.store.getAt(argRow);
        Ext.state.Manager.set('projectId',tmpProjectModel.data.id);
        AliveTracker.assignUsersToProjectsController.insert = false;
        var tmpProjectPopUp = this.createProjectPopUp(Locales.AliveTracker.PROJECTS_COLUMN_HEADER_EDIT_PROJECT);
        this.getProjectModelForm().loadRecord(tmpProjectModel);
    },

    onDeleteGroup: function(argProject){
        var tmpProjectStore = Ext.getStore('projects.Projects');
        argProject.setProxy({
            type: 'restproxy',
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_PROJECT,argProject.data.id)
        });
        argProject.destroy({
            scope: this,
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_PROJECT,argProject.data.id)
        });
        tmpProjectStore.removeAt(tmpProjectStore.find('id', argProject.data.id));
        tmpProjectStore.commitChanges();
    },

    onConfirmDeleteProject: function(argGrid,argRow) {
        Ext.MessageBox.confirm(
            'Confirm',
            Ext.util.Format.format(Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
            function (argButton) {
                if (argButton == 'yes') {
                    this.onDeleteGroup(argGrid.store.getAt(argRow));
                }
            },
            this
        );
    },

    onShowProjectPopUp: function(){
        AliveTracker.assignUsersToProjectsController.insert = true;
        var tmpProjectPopUp = this.createProjectPopUp(Locales.AliveTracker.PROJECTS_COLUMN_HEADER_NEW_PROJECT);
    },

    createProjectPopUp: function(argTitle){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl
        });
        this.addProjectPopup = Ext.create('AliveTracker.view.users.UserRolesAssignmentPopUp');
        this.addProjectPopup.title = argTitle;
        this.addProjectPopup.show();
        return this.addProjectPopup;
    }
});