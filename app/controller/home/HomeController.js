Ext.define("AliveTracker.controller.home.HomeController", {

    extend:"Ext.app.Controller",

    models:[
        'Group',
        'BelongGroup'
    ],

    stores:[
        'Groups',
        'BelongGroups'
    ],

    views: [
        'home.Home',
        'home.AddGroupPopUp',
        'home.HomeBelongGroupsViewer',
        'home.HomeGroupsViewer'
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
            'home': {
                onCreateNewGroup: this.onCreateNewGroup,
                afterrender: this.onHomeGroupsInfoLoad
            },
            'homegroupsviewer': {
                afterrender: this.onHomeGroupsAfterRender
            },
            'homebelonggroupsviewer': {
                afterrender: this.onHomeBelongGroupsAfterRender
            },
            "addgrouppopup": {
                onSaveAction: this.onSaveAction,
                onCloseWindows: this.onCloseWindows
            }
        });
    },

    /**
     * Home AfterRender
     * */
    onHomeGroupsInfoLoad:function () {
        this.onMyGroupsLoad();
        this.onGroupsIBelongLoad();
    },

    onMyGroupsLoad:function () {
//        Framework.ux.data.RestProxy.setHeaders({
//            'user-id':Framework.core.ModelLocator.loggedUser.data.id
//        });
//        var tmpGroupStore = Ext.create('AliveTracker.store.Groups');
//        tmpGroupStore.load({
//            scope: this,
//            callback: this.onLoadMyGroupsResult
//        });
    },
    onLoadMyGroupsResult:function(argRecords,argOperation,argSuccess){
        if(argSuccess){
            var data = Ext.decode(argResponse.responseText);
        }
    },
    onGroupsIBelongLoad:function () {
        Ext.Ajax.request({
            url:AliveTracker.defaults.WebServices.GROUP_GROUPS_I_BELONG,
            scope:this,
            success:this.onGroupsIBelongLoadSuccess,
            failure:this.onGroupsIBelongLoadFailure,
            headers:{
                'user-id':Framework.core.ModelLocator.loggedUser.data.id
            }
        });
    },
    onGroupsIBelongLoadSuccess:function (argResponse) {
        var data = Ext.decode(argResponse.responseText);
    },

    onGroupsIBelongLoadFailure:function () {
    },

    onHomeGroupsAfterRender: function(agrAbstractComponent){
        var tmpEl = agrAbstractComponent.getEl();
        tmpEl.on('click', this.onConfirmDeleteDialog, this, {delegate: '.deleteGroup'});
        tmpEl.on('click', this.onShowGroupDetailView, this, {delegate: '.groupImage'});
    },

    onHomeBelongGroupsAfterRender: function(agrAbstractComponent){
        var tmpMe = this;
        var tmpEl = agrAbstractComponent.getEl();
        tmpEl.on('click', tmpMe.onShowBelongGroupDetailView, tmpMe, {delegate: '.belongGroupImage'});
    },

    loadHomeStore: function(){
        var tmpGroupsStore = Ext.getStore('Groups');
        tmpGroupsStore.load({
            callback: function(){
            }
        });
        var tmpBelongGroupsStore = Ext.getStore('BelongGroups');
        tmpBelongGroupsStore.load({
            callback: function(){
            }
        });
    },

    onShowGroupDetailView: function(agrAbstractComponent, argElement){
        this.selectedGroupElement = argElement;
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_PROJECTS,this.selectedGroupElement.id);
        var tmpProjectStore = Ext.getStore('Projects');
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
        this.navigateToGroupView('Groups', this.selectedGroupElement);
    },

    /**
     * Show GroupDetailView when user click on the imagen in home
     * */
    onShowBelongGroupDetailView: function(agrAbstractComponent, argElement){
        this.navigateToGroupView('BelongGroups', argElement);
    },

    /**
     * Change the view to groupDetail,
     * Parameter defines the store that you want to extract the model
     * */
    navigateToGroupView: function(agrStore, argElement){
        var tmpGroupsStore = Ext.getStore(agrStore);
        var tmpModel = tmpGroupsStore.findRecord('id', argElement.getAttribute('id'));
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'groupDetailPage');
    },

    /**
     * Delete a created group
     * */
    onDeleteGroup: function(argElement){
        var tmpGroupStore = Ext.getStore('Groups');
        tmpGroupStore.removeAt(tmpGroupStore.find('id', argElement.getAttribute('id')));
        tmpGroupStore.commitChanges();
    },

    /**
     * Show a pop up to confirm the delete action
     * */
    onConfirmDeleteDialog: function(argEvent, argElement) {
        Ext.MessageBox.confirm(
            'Confirm',
            Ext.util.Format.format(AliveTracker.defaults.Constants.HOME_DELETE_PROJECT_CONFIRMATION_MESSAGE),
            function(argButton){
                if(argButton == 'yes')
                {
                    this.onDeleteGroup(argElement)
                }
            },
            this
        );
    },

    /**
     * Show a popup to request for the data to create a new project
     * */
    onCreateNewGroup: function(){
        this.addEditGroupPopUp = this.getAddGroupPopUp(true, null);
    },

    /**
     * Returns an instance of a addEditGroupPopUp created
     * */
    getAddGroupPopUp: function(argElement){
        var tmpAddEditGroupPopUp = Ext.create('AliveTracker.view.home.AddGroupPopUp');
        var tmpGroupForm = this.getGroupModelForm();
        var tmpModel = Ext.create('AliveTracker.model.Group');
        tmpGroupForm.loadRecord(tmpModel);
        tmpAddEditGroupPopUp.show();
        return tmpAddEditGroupPopUp;
    },

    /**
     * Will add a new group to the store
     * */
    onSaveAction: function(argEvent){
        var tmpForm = argEvent;
        var tmpGroupModel = this.onCreateModelFromGroupModelValues();
        var tmpGroupStore = Ext.getStore('Groups');
        tmpGroupStore.add(tmpGroupModel);
        tmpGroupStore.commitChanges();
        tmpWindow.close();
//        Framework.ux.data.RestProxy.setHeaders({
//            name: tmpForm[0].value,
//            description: tmpForm[1].value,
//            logo: tmpForm[2].value,
//            website: tmpForm[3].value
//        });
//        var tmpGroupStore = Ext.create('AliveTracker.store.Groups');
//        tmpGroupStore.load({
//            scope: this,
//            callback: this.onCreateGroupResult
//        });
    },

    onCreateGroupResult: function(argRecords,argOperation,argSuccess){
        Framework.core.ModelLocator.loggedUser = argRecords[0];
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    /**
     * Creates group model from form values
     * */
    onCreateModelFromGroupModelValues: function(){
        var tmpItem = this.getGroupModelForm().getValues();
        var tmpId = this.getGroupModelForm().getRecord().getData().id;
        if(tmpId === 0){
            tmpId = 10;
        }
        var tmpModel = Ext.create('AliveTracker.model.Group', {
            id: tmpId,
            name: tmpItem.name,
            description: tmpItem.description,
            logoUrl: tmpItem.logoUrl,
            webSiteUrl: tmpItem.webSiteUrl
        });
        return tmpModel;
    },

    /**
     * Will close addEditGroupPopUp
     * */
    onCloseWindows: function(argEvent){
        var tmpWindow = argEvent;
        tmpWindow.close();
    }

});