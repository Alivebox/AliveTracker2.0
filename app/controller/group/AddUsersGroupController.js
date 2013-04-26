Ext.define("AliveTracker.controller.group.AddUsersGroupController", {

    extend: "Ext.app.Controller",

    views: [
        'group.AddUsersGroup',
        'users.UsersGrid'
    ],

    stores: [
        'users.GroupUsers',
        'users.NewUsers'
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

    currentSearchValue: null,

    init: function(){
        this.control({
            'addusersgroup': {
                afterrender: this.onAddUserPopUpAfterRender,
                comboUsersKeyUp: this.executeUsersSearch,
                addUserClick: this.addUser,
                saveGroupUsers: this.onUpdateGroupUsers
            },
            'usersgrid actioncolumn[name=userGridActionId]': {
                click: this.onUserGridActionIdAction
            }
        });
    },

    executeUsersSearch: function(argDataToFilter,argAutoCompleteBox){
        this.currentSearchValue = argDataToFilter;
        var tmpNewUsersStore = Ext.getStore('NewUsers');
        var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_ALL_USERS,this.currentSearchValue);
        if(this.currentSearchValue.length > 0)
        {
            tmpNewUsersStore.load({
                scope: this,
                urlOverride:  tmpStoreUrl,
                callback: this.showAutoCompleteView(argAutoCompleteBox)
            });
        }
    },

    showAutoCompleteView: function(argAutoCompleteBox){
        argAutoCompleteBox.expand();
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
        var tmpProjectUserStore = Ext.getStore('users.GroupUsers');
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
        var tmpRoleStore = Ext.getStore('roles.Roles');
        var tmpUrlOverride = AliveTracker.defaults.WebServices.GET_ROLES;
        tmpRoleStore.load({
            scope: this,
            urlOverride: tmpUrlOverride
        });
    },

    onLoadUserListStore: function() {
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl
        });
    },

    addUser:function(argData){
        this.currentSearchValue = argData;
        var tmpUser = null;
        var tmpExistUser = null;
        var tmpNewUsersStore = Ext.getStore('users.NewUsers');
        var tmpProjectUserStore = Ext.getStore('users.GroupUsers');
        var userExists = false;
        for(var tmpIndex=0;tmpIndex < tmpNewUsersStore.getCount();tmpIndex++){
            tmpUser = tmpNewUsersStore.getAt(tmpIndex);
            if(tmpUser.get('email')==this.currentSearchValue)
            {
                break;
            }
        }
        for(tmpIndex=0;tmpIndex < tmpProjectUserStore.getCount();tmpIndex++){
            tmpExistUser = tmpProjectUserStore.getAt(tmpIndex);
            if(tmpUser.get('id')==tmpExistUser.get('id'))
            {
                userExists=true;
            }
        }
        if(!userExists)
        {
            tmpUser.set('role','dev');
            tmpProjectUserStore.add(tmpUser);
            tmpProjectUserStore.commitChanges();
        }
        else
        {
        Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.USER_EXISTS);
        }
    },

    getAddUserPopUp: function(){
        var tmpAddUserPopUp = Ext.create('AliveTracker.view.group.AddUsersGroupPopUp');
        tmpAddUserPopUp.show();
        return tmpAddUserPopUp;
    },

    onUpdateGroupUsers: function(){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpAssignArray = [];
        for(var tmpCont=0; tmpCont < tmpUsersGroupStore.data.items.length; tmpCont++){
            tmpAssignArray.push(tmpUsersGroupStore.data.items[tmpCont].data)
        }

        var tmpGroup = Ext.create('AliveTracker.model.groups.Group', {
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
        Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SUCCESS_SAVE_GROUP);
    }
});