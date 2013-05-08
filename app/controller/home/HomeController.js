Ext.define("AliveTracker.controller.home.HomeController", {

    extend:"Ext.app.Controller",

    models:[
        'groups.Group',
        'groups.BelongGroup'
    ],

    stores:[
        'groups.Groups',
        'groups.BelongGroups',
        'groups.GroupsDTO',
        'users.LoginUsers'
    ],

    views: [
        'home.Home',
        'home.AddGroupPopUp',
        'home.HomeBelongGroupsGrid',
        'home.HomeGroupsGrid'
    ],

    refs:[
        {
            ref:'groupModelForm',
            selector:'addgrouppopup form[name=groupModelForm]'
        },
        {
            ref:'main',
            selector:'main'
        },
        {
            ref:'groupdetailform',
            selector:'groupdetailform'
        }
    ],

    currentDefaultGroup: 0,

    init:function () {
        this.control({
            'homeview': {
                beforerender: this.loadHomeGroups,
                groupSelected: this.onGroupSelected,
                addGroup: this.onCreateNewGroup
            },
            'homegroupsgrid': {
                onDeleteGroup: this.onConfirmDeleteDialog,
                defaultGroupSelected: this.onDefaultGroupSelected
            },
            'homebelonggroupsgrid':{
                defaultGroupSelected: this.onDefaultGroupSelected
            },
            "addgrouppopup": {
                onSaveAction: this.saveGroup,
                onCloseWindows: this.closeWindows
            }
        });
    },

    loadHomeGroups:function () {
        var tmpStore = Ext.getStore('users.LoginUsers');
        var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_ALL_USERS, Framework.core.SecurityManager.getCurrentUsername());
        tmpStore.load({
            scope: this,
            urlOverride: tmpStoreUrl,
            callback: this.loadGroupsDTO
        });
    },

    loadGroupsDTO:function (argRecord) {
        this.currentDefaultGroup = argRecord[0].data.default_group;
        var tmpGroupsDTO = Ext.getStore('groups.GroupsDTO');
        tmpGroupsDTO.load({
            scope: this,
            callback: this.onLoadMyGroupsResult
        });
    },

    onLoadMyGroupsResult:function(argRecords,argOperation,argSuccess){
        if(argSuccess){
            var tmpBelongGroups = Ext.getStore('groups.BelongGroups');
            tmpBelongGroups.removeAll();
            var tmpBelongGroupsList = argRecords[0].data.belongToGroups;
            var tmpGroupsList = argRecords[0].data.myGroups;
            var tmpGroups = Ext.getStore('groups.Groups');
            tmpGroups.removeAll();
            for (var tmpCont = 0; tmpCont <= tmpBelongGroupsList.length-1; tmpCont++){
                var tmpBelongGroup = tmpBelongGroupsList[tmpCont];
                if(tmpBelongGroup.id==this.currentDefaultGroup){
                    tmpBelongGroup.default_group=true;
                }
                tmpBelongGroups.add(tmpBelongGroup)
            }
            for (var tmpCont = 0; tmpCont <= tmpGroupsList.length-1; tmpCont++){
                var tmpGroup = tmpGroupsList[tmpCont];
                if(tmpGroup.id==this.currentDefaultGroup){
                    tmpGroup.default_group=true;
                }
                tmpGroups.add(tmpGroup)
            }
        }
    },

    onGroupSelected: function(argRecord){
        Ext.state.Manager.set('groupId',argRecord.getData().id)
        this.showGroupDetailPage();
    },

    showGroupDetailPage: function(){
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'groupDetailPage');
    },

    onDefaultGroupSelected: function(argRowIndex, argStore){
        var tmpGroup = argStore.getAt(argRowIndex);
        tmpGroup.set('default_group',true);
        var tmpGroup = argStore.getAt(argRowIndex);
        var tmpGroupId = tmpGroup.get('id');
        this.currentDefaultGroup = tmpGroupId;
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, tmpGroupId);
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl,
            callback: this.saveDefaultGroup
        });
    },

    saveDefaultGroup: function(){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        for(var tmpIndex=0;tmpIndex < tmpUsersGroupStore.getCount();tmpIndex++){
            var tmpUser = tmpUsersGroupStore.getAt(tmpIndex);
            if(tmpUser.get('name')==Framework.core.SecurityManager.getCurrentUsername()){
                break;
            }
        }
        tmpUser.set('default_group',this.currentDefaultGroup);
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_DEFAULT_GROUP,tmpUser.get('id'));
        tmpUser.save({
            scope: this,
            urlOverride: tmpUrl
        });
    },

    onDeleteGroup: function(argGroupId,argStore){
        var tmpGroupStore = Ext.getStore(argStore);
        var tmpGroup = tmpGroupStore.findRecord('id', argGroupId);
        tmpGroup.setProxy({
            type: 'restproxy',
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_GROUP,argGroupId)
        });
        tmpGroup.destroy({
            scope: this,
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_GROUP,argGroupId)
        });
        tmpGroupStore.removeAt(tmpGroupStore.find('id', argGroupId));
        tmpGroupStore.commitChanges();
    },

    onConfirmDeleteDialog: function(argRowIndex,argStore) {
        var tmpGroupId = Ext.getStore(argStore).getAt(argRowIndex).get('id');
        Ext.MessageBox.confirm(
            'Confirm',
            Locales.AliveTracker.HOME_DELETE_PROJECT_CONFIRMATION_MESSAGE,
            function(argButton){
                if(argButton == 'yes')
                {
                    this.onDeleteGroup(tmpGroupId,argStore)
                }
            },
            this
        );
    },

    onCreateNewGroup: function(){
        this.addEditGroupPopUp = this.getAddGroupPopUp(true, null);
    },

    getAddGroupPopUp: function(argElement){
        var tmpAddEditGroupPopUp = Ext.create('AliveTracker.view.home.AddGroupPopUp');
        var tmpGroupForm = this.getGroupModelForm();
        var tmpModel = Ext.create('AliveTracker.model.groups.Group');
        tmpGroupForm.loadRecord(tmpModel);
        tmpAddEditGroupPopUp.show();
        return tmpAddEditGroupPopUp;
    },

    saveGroup: function(argEvent){
        var tmpGroupModel = this.onCreateModelFromGroupModelValues();
        tmpGroupModel.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.SAVE_GROUP
        });
        tmpGroupModel.save({
            scope: this,
            urlOverride: AliveTracker.defaults.WebServices.SAVE_GROUP,
            success: this.saveGroupCallback
        });
        this.closeWindows(argEvent);
    },

    saveGroupCallback: function(argRecord){
        var tmpGroupStore = Ext.getStore('groups.Groups');
        tmpGroupStore.add(argRecord);
        tmpGroupStore.commitChanges();
    },

    onCreateGroupResult: function(argRecords,argOperation,argSuccess){
        Framework.core.ModelLocator.loggedUser = argRecords[0];
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    onCreateModelFromGroupModelValues: function(){
        var tmpItem = this.getGroupModelForm().getValues();
        var tmpModel = Ext.create('AliveTracker.model.groups.Group', {
            name: tmpItem.name,
            description: tmpItem.description,
            logo_url: tmpItem.logo_url,
            web_site_url: tmpItem.web_site_url
        });
        return tmpModel;
    },

    closeWindows: function(argEvent){
        var tmpWindow = argEvent;
        tmpWindow.close();
    }

});