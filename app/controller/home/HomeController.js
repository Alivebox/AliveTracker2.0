Ext.define("AliveTracker.controller.home.HomeController", {

    extend:"Ext.app.Controller",

    models:[
        'groups.Group',
        'groups.BelongGroup'
    ],

    stores:[
        'groups.Groups',
        'groups.BelongGroups',
        'groups.GroupsDTO'
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

    init:function () {
        this.control({
            'homeview': {
                onShowCreateNewGroup: this.onCreateNewGroup,
                groupSelected: this.onShowGroupPage,
                onShowBelongGroupPage: this.onShowBelongGroupPage
            },
            'homegroupsgrid': {
                afterrender: this.onHomeGroupsAfterRender,
                onDeleteGroup: this.onConfirmDeleteDialog
            },
            'homebelonggroupsgrid': {
                afterrender: this.onHomeBelongGroupsAfterRender
            },
            "addgrouppopup": {
                onSaveAction: this.saveGroup,
                onCloseWindows: this.closeWindows
            }
        });
    },

    onShowGroupPage: function(argRecord){
        var tmpModel = argRecord;
        this.onShowGroupDetailView(tmpModel.getData().id);
    },

    onShowBelongGroupPage: function(agrComponent, argRow, argIndex){
        var tmpModel = argIndex;
        this.onShowBelongGroupDetailView(tmpModel.getData().id);

    },


    onHomeGroupsInfoLoad:function () {
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
                tmpBelongGroups.add(tmpBelongGroupsList[tmpCont])
            }
            for (var tmpCont = 0; tmpCont <= tmpGroupsList.length-1; tmpCont++){
                tmpGroups.add(tmpGroupsList[tmpCont])
            }
        }
    },

    onHomeGroupsAfterRender: function(agrAbstractComponent){
        this.onHomeGroupsInfoLoad();
    },

    onHomeBelongGroupsAfterRender: function(agrAbstractComponent){
        var tmpMe = this;
        var tmpEl = agrAbstractComponent.getEl();
        tmpEl.on('click', tmpMe.onShowBelongGroupDetailView, tmpMe, {delegate: '.belongGroupImage'});
    },

    onShowGroupDetailView: function(argElement){
        this.selectedGroupElement = argElement;
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_PROJECTS,this.selectedGroupElement);
        var tmpProjectStore = Ext.getStore('projects.Projects');
        tmpProjectStore.load({
                scope: this,
                callback: this.onProjectDetailResult,
                urlOverride: tmpUrl
            }
        );
    },

    onProjectDetailResult: function(argRecords,argOperation,argSuccess){
        if( !argSuccess){
            return;
        }
        Ext.state.Manager.set('groupId',this.selectedGroupElement);
        this.navigateToGroupView('groups.Groups', this.selectedGroupElement);
    },

    /**
     * Show GroupDetailView when user click on the imagen in home
     * */
    onShowBelongGroupDetailView: function(argElement){
        this.navigateToGroupView('groups.BelongGroups', argElement);
    },

    /**
     * Change the view to groupDetail,
     * Parameter defines the store that you want to extract the model
     * */
    navigateToGroupView: function(agrStore, argElement){
        this.onLoadUsersGroup();
        this.onLoadRolesStore();
        this.onGetPermissions();
        var tmpGroupsStore = Ext.getStore(agrStore);
        var tmpModel = tmpGroupsStore.findRecord('id', argElement);
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'groupDetailPage');
    },

    onLoadUsersGroup: function(){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl
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

    onGetPermissions: function(){
        var tmpPermissionsArray = [];
        var tmpGroupsStore = Ext.getStore('groups.Groups');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS,Ext.state.Manager.get('groupId'));
        tmpGroupsStore.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS
        });
        tmpGroupsStore.load({
            scope: this,
            urlOverride:  tmpUrl
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