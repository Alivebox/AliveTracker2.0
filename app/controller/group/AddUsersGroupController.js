Ext.define("AliveTracker.controller.group.AddUsersGroupController", {

    extend: "Ext.app.Controller",

    views: [
        'group.AddUsersGroup',
        'users.UsersGrid'
    ],

    stores: [
        'GroupUsers',
        'NewUsers'
    ],

    refs: [
        {
            ref: 'addUsersCombo',
            selector: 'addusersgroup #usersCombo'
        },
        {
            ref: 'usersGrid',
            selector: 'usersgrid'
        }

    ],

    init: function(){
        this.control({
            'addusersgroup': {
                afterrender: this.onAddUserPopUpAfterRender,
                comboUsersKeyUp: this.filterComboUsers,
                addUserClick: this.addUser,
                saveGroupUsers: this.onUpdateGroupUsers
            },
            'usersgrid actioncolumn[name=userGridActionId]': {
                click: this.onUserGridActionIdAction
            }
        });
    },

    onUserGridActionIdAction: function(argGrid,argCell,argRow,argCol,argEvent){
        var tmpRec = argGrid.getStore().getAt(argRow);
        var tmpAction = argEvent.target.getAttribute('class');
        if (tmpAction.indexOf("x-action-col-0") != -1) {
            this.onConfirmDeleteUser(argGrid,argRow);
        }
    },

    onConfirmDeleteUser: function(argGrid,argRow){
        Ext.MessageBox.confirm(
            'Confirm',
            Ext.util.Format.format(Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),
            function(argButton){
                if(argButton == 'yes')
                {
                    this.deleteUser(argGrid.store.getAt(argRow));
                }
            },
            this
        );
    },

    deleteUser: function(argUser){
        debugger;
        var tmpProjectUserStore = Ext.getStore('GroupUsers');
        argUser.setProxy({
            type: 'restproxy',
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_USER, argUser.data.id, Ext.state.Manager.get('groupId'))
        });
        argUser.destroy({
            scope: this,
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_USER, argUser.data.id, Ext.state.Manager.get('groupId'))
        });
        tmpProjectUserStore.remove(tmpProjectUserStore.findRecord('id', argUser.data.id));
        tmpProjectUserStore.commitChanges();
    },

    onAddUserPopUpAfterRender: function() {
        this.onLoadUserListStore();
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

    onLoadUserListStore: function() {
        var tmpUsersGroupStore = Ext.getStore('GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl
        });
    },

    addUser:function(e, el){
        if(Ext.isEmpty(this.getAddUsersCombo().lastSelection[0])){
            return;
        }
        var tmpUser = this.getAddUsersCombo().lastSelection[0].data;
        var tmpModel = Ext.create('AliveTracker.model.User', {
            name: tmpUser.name,
            role: 'usr'
        });
        var tmpUsersStore = Ext.getStore('AssignedUsers');
        tmpUsersStore.add(tmpModel);
        tmpUsersStore.commitChanges();
    },

    getAddUserPopUp: function(){
        var tmpAddUserPopUp = Ext.create('AliveTracker.view.group.AddUsersGroupPopUp');
        tmpAddUserPopUp.show();
        return tmpAddUserPopUp;
    },

    filterComboUsers: function (argDataToFilter){
        debugger;
        var query = argDataToFilter.toLowerCase();
        var tmpStore = Ext.getStore('NewUsers');
        tmpStore.clearFilter();
        tmpStore.filterBy(function(record, id) {
            var name_check = record.get('name').toLowerCase().indexOf(query)
            if( name_check > -1){
                return true;
            }
            else{
                return false;
            }
        });
    },
    onUpdateGroupUsers: function(){
        var tmpUsersGroupStore = Ext.getStore('GroupUsers');
        var tmpAssignArray = [];
        for(var tmpCont=0; tmpCont < tmpUsersGroupStore.data.items.length; tmpCont++){
            tmpAssignArray.push(tmpUsersGroupStore.data.items[tmpCont].data)
        }

        var tmpGroup = Ext.create('AliveTracker.model.Group', {
            id: Ext.state.Manager.get('groupId'),
            users: tmpAssignArray
        });

        tmpGroup.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.UPDATE_GROUP_USER
        });

        tmpGroup.save({
            scope: this,
            url: AliveTracker.defaults.WebServices.UPDATE_GROUP_USER
        });
        this.getUsersGrid().cbUserGridRoles.clear;
    }

});