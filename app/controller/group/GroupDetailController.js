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
        }
    ],

    init: function(){
        this.control(
            {
                'groupprojects': {
                    addProject : this.onShowProjectPopUp
                },
                'addgrouppopup': {
                    addProjectClick : this.onAddProject
                },
                'actioncolumn#projectGridActionId': {
                    click: this.onProjectGridActionIdAction
                }
            });
    },

    onProjectGridActionIdAction: function(argGrid,argCell,argRow,argCol,argEvent) {
        debugger;
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
        this.addProjectPopup = Ext.create('AliveTracker.view.users.UserRolesAssignmentPopUp');
        this.addProjectPopup.title = argGrid.store.getAt(argRow).data.name;
        this.getAssignUsersToProjectsView().insert = false;
        this.addProjectPopup.show();
    },

    onConfirmDeleteProject: function(argGrid,argRow) {
        Ext.MessageBox.confirm(
            'Confirm',
            Ext.util.Format.format(Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
            function (argButton) {
                if (argButton == 'yes') {
                    argGrid.getStore().removeAt(argRow);
                }
            },
            this
        );
    },

    onShowProjectPopUp: function(){
        this.addProjectPopup = Ext.create('AliveTracker.view.users.UserRolesAssignmentPopUp');
        this.addProjectPopup.title = Locales.AliveTracker.PROJECTS_COLUMN_HEADER_NEW_PROJECT;
        this.getAssignUsersToProjectsView().insert = true;
        this.addProjectPopup.show();
    },

    onAddProject: function(argEvent){
        var tmpWindow = argEvent;
        var tmpProjectName = argEvent.projectTextField.value;
        this.loadProjectToStore(tmpProjectName);
        tmpWindow.close();
    }

});