Ext.define("AliveTracker.controller.group.AddUsersGroupController", {

    extend: "Ext.app.Controller",

    views: [
        'users.AddUsersGroup',
        'users.UsersGrid'
    ],

    stores: [
        'users.GroupUsers',
        'users.NewUsers'
    ],

    refs: [
        {
            ref: 'usersGrid',
            selector: 'usersgrid'
        },
        {
            ref: 'autoComplete',
            selector:'addusersgroup [itemId=autoCompleteBox]'
        }

    ],

    currentSearchValue: null,

    init: function(){
        this.control({
            'addusersgroup': {
                beforerender: this.onAddUserPopUpBeforeRender,
                comboUsersKeyUp: this.executeUsersSearch,
                addUserClick: this.addUser
            },
            'usersgrid actioncolumn[name=userGridActionId]': {
                click: this.onUserGridActionIdAction
            },
            'usersgrid':{
                editCell: this.onUpdateGroupUsers,
                sortColumn: this.changeColumnBackground
            }
        });
    },

    onAddUserPopUpBeforeRender: function() {
        this.onLoadUserListStore();
        this.getAutoComplete().focus(false, 200);
    },

    onLoadUserListStore: function() {
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl,
            callback: this.onLoadRolesStore
        });
    },

    onLoadRolesStore: function(){
        var tmpRoleStore = Ext.getStore('roles.Roles');
        var tmpUrlOverride = AliveTracker.defaults.WebServices.GET_ROLES;
        tmpRoleStore.load({
            scope: this,
            urlOverride: tmpUrlOverride
        });
    },

    executeUsersSearch: function(argDataToFilter,argAutoCompleteBox){
        this.currentSearchValue = argDataToFilter;
        var tmpNewUsersStore = Ext.getStore('users.NewUsers');
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

    addUser:function(argData){
        this.currentSearchValue = argData;
        var tmpAddUser = null;
        var tmpNewUsersStore = Ext.getStore('users.NewUsers');
        var tmpProjectUserStore = Ext.getStore('users.GroupUsers');
        for(var tmpIndex=0;tmpIndex < tmpNewUsersStore.getCount();tmpIndex++){
            var tmpUser = tmpNewUsersStore.getAt(tmpIndex);
            if(tmpUser.get('email')==this.currentSearchValue)
            {
                tmpAddUser = tmpUser;
                break;
            }
        }
        if(!tmpAddUser){
            this.getAutoComplete().markInvalid();
            return;
        }
        if(this.userExists(tmpAddUser))
        {
            Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.USER_EXISTS);
            return;
        }
        tmpUser.set('role','dev');
        tmpProjectUserStore.add(tmpUser);
        tmpProjectUserStore.commitChanges();
        this.onUpdateGroupUsers();
    },

    userExists: function(argValue){
        var tmpProjectUserStore = Ext.getStore('users.GroupUsers');
        for(var tmpIndex=0;tmpIndex < tmpProjectUserStore.getCount();tmpIndex++){
            var tmpExistUser = tmpProjectUserStore.getAt(tmpIndex);
            if(argValue.get('id')==tmpExistUser.get('id'))
            {
                return true;
            }
        }
        return false;
    },

    getAddUserPopUp: function(){
        var tmpAddUserPopUp = Ext.create('AliveTracker.view.group.AddUsersGroupPopUp');
        tmpAddUserPopUp.show();
        return tmpAddUserPopUp;
    },

    changeColumnBackground: function(argColumn){
        argColumn.removeCls('user-grid-column');
        argColumn.addCls('user-grid-sort-column');
    },

    onUpdateGroupUsers: function(){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpAssignArray = [];
        var tmpAutoComplete = this.getAutoComplete();
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
        tmpAutoComplete.setValue("");
        tmpAutoComplete.focus();
    }
});