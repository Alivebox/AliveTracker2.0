Ext.define("AliveTracker.controller.projects.GroupProjectsController", {

    extend: "Ext.app.Controller",

    views:[
        'projects.GroupProjects',
        'projects.ProjectsGrid',
        'users.UserRolesAssignmentPopUp'
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
            selector:'assignuserstoprojectsview [itemId=projectModelForm]'
        }
    ],

    init: function(){
        this.control(
            {
                'actioncolumn#projectGridActionId': {
                    click: this.onProjectGridActionIdAction
                },
                'groupprojects': {
                    addProject : this.onShowProjectPopUp,
                    rowDblclick: this.showEditProjectPopUp
                },
                'projectgrid':{
                    sortColumn: this.changeColumnBackground
                }
            });
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

    onConfirmDeleteProject: function(argGrid,argRow) {
        Ext.MessageBox.confirm(
            'Confirm',
            Ext.util.Format.format(Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
            function (argButton) {
                if (argButton == 'yes') {
                    this.onDeleteProject(argGrid.store.getAt(argRow));
                }
            },
            this
        );
    },

    showEditProjectPopUp: function(argGrid,argRow){
        var tmpProjectModel = argGrid.store.getAt(argRow);
        Ext.state.Manager.set('projectId',tmpProjectModel.data.id);
        AliveTracker.assignUsersToProjectsController.insert = false;
        var tmpProjectPopUp = this.createProjectPopUp(Locales.AliveTracker.PROJECTS_COLUMN_HEADER_EDIT_PROJECT);
        this.getProjectModelForm().loadRecord(tmpProjectModel);
    },

    onDeleteProject: function(argProject){
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
    },

    changeColumnBackground: function(argColumn){
        argColumn.removeCls('project-grid-column');
        argColumn.addCls('project-grid-sort-column');
    }
});