Ext.define('AliveTracker.controller.group.GroupDetailController', {

    extend: "Ext.app.Controller",

    views:[
        'group.GroupDetail',
        'group.GroupProjects',
        'group.ProjectsGrid',
        'users.UserRolesAssignmentPopUp'
    ],

    requires : [
        'AliveTracker.view.users.UsersGrid',
        'AliveTracker.view.group.GroupProjects'
    ],

    models:[
        'User',
        'Project',
        'Role'
    ],

    stores:[
        'Users',
        'Projects',
        'Roles',
        'AssignedUsers',
        'ProjectUsers'
    ],

    refs: [
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
        this.control(
            {
                'groupprojects': {
                    addProject : this.onShowProjectPopUp
                },
                'actioncolumn#projectGridActionId': {
                    click: this.onProjectGridActionIdAction
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

    showEditProjectPopUp: function(argGrid,argRow){
        var tmpProjectModel = argGrid.store.getAt(argRow);
        Ext.state.Manager.set('projectId',tmpProjectModel.data.id);
        AliveTracker.assignUsersToProjectsController.insert = false;
        var tmpProjectPopUp = this.createProjectPopUp(Locales.AliveTracker.PROJECTS_COLUMN_HEADER_EDIT_PROJECT);
        this.getProjectModelForm().loadRecord(tmpProjectModel);
    },

    onDeleteGroup: function(argProject){
        var tmpProjectStore = Ext.getStore('Projects');
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
    this.addProjectPopup = Ext.create('AliveTracker.view.users.UserRolesAssignmentPopUp');
    this.addProjectPopup.title = argTitle;
    this.addProjectPopup.show();
    return this.addProjectPopup;
    }
});