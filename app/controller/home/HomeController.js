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
        'home.Home'
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
                onCreateNewGroup: this.onCreateNewGroup
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
     * HomeGroups AfterRender
     * */
    onHomeGroupsAfterRender: function(agrAbstractComponent){
        var tmpMe = this;
        var tmpEl = agrAbstractComponent.getEl();
        tmpEl.on('click', tmpMe.onConfirmDeleteDialog, tmpMe, {delegate: '.deleteGroup'});
        tmpEl.on('click', tmpMe.onShowGroupDetailView, tmpMe, {delegate: '.groupImage'});
    },

    /**
     * HomeBelongGroupViewer afterrender
     * */
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

    /**
     * Show GroupDetailView when user click on the imagen in home
     * */
    onShowGroupDetailView: function(agrAbstractComponent, argElement){
        this.navigateToGroupView('Groups', argElement);
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
//        this.getGroupdetailform().groupData = tmpModel;
//        this.getGroupdetailform().groupTitleLabel.setText(tmpModel.get('name'));
//        this.getGroupdetailform().groupImage.setSrc(AliveTracker.defaults.Constants.EXT_GROUP_IMAGE_IO_SIZE + tmpModel.get('logoUrl'));
//        this.getMain().setActiveTab(this.getGroupdetailform());
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
        var tmpWindow = argEvent;
        var tmpGroupModel = this.onCreateModelFromGroupModelValues();
        var tmpGroupStore = Ext.getStore('Groups');
        tmpGroupStore.add(tmpGroupModel);
        tmpGroupStore.commitChanges();
        tmpWindow.close();
    },

    /**
     * Creates group model from form values
     * */
    onCreateModelFromGroupModelValues: function(){
        //TODO fix the ID
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