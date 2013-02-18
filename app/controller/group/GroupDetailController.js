Ext.define('AliveTracker.controller.group.GroupDetailController', {

    extend: "Ext.app.Controller",
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
        'AssignedUsers'
    ],
    init: function(){
        this.control({
            'groupprojects': {
                addProject : this.onShowProjectPopUp
            },
            'addprojectpopup': {
                addProjectClick : this.onAddProject
            }
        });
    },

    onUserAfterRender: function(){
    },

    loadGroupStore: function(){
        var tmpGroupsStore = Ext.getStore('Users');
        tmpGroupsStore.load({
            callback: function(){
            }
        });
    },

    loadProjectStore: function(){
        var tmpProjectsStore = Ext.getStore('Projects');
        tmpProjectsStore.removeAll();
        tmpProjectsStore.load({
            callback: function(){
            }
        });
    },

    /**Will show a pop up to request a project*/
    onShowProjectPopUp: function(){
        this.addProjectPopup = Ext.create('AliveTracker.view.users.UserRolesAssignmentPopUp');
        this.addProjectPopup.title = 'New Project';
        this.addProjectPopup.show();
    },

    /**This method will add a project*/
    onAddProject: function(argEvent){
        var tmpWindow = argEvent;
        var tmpProjectName = argEvent.projectTextField.value;
        this.loadProjectToStore(tmpProjectName);
        tmpWindow.close();
    },

    /**Method in charge to load element to a project store*/
    loadProjectToStore: function(argProjectName){
        var tmpProjectStore = Ext.getStore('Projects');
        var tmpProjectModel = tmpProjectStore.getProxy().getModel();
        var tmpProject = new tmpProjectModel({name: argProjectName});
        tmpProjectStore.add(tmpProject);
        tmpProjectStore.commitChanges();
    }

});