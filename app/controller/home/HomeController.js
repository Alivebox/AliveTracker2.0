Ext.define("AliveTracker.controller.home.HomeController", {

    extend:"Ext.app.Controller",

    models:[
        'Group',
        'BelongGroup'
    ],

    stores:[
        'Groups',
        'BelongGroups',
        'GroupsDTO'
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
            'homeview': {
                onShowCreateNewGroup: this.onCreateNewGroup,
                onShowGroupPage: this.onShowGroupPage,
                onShowBelongGroupPage: this.onShowBelongGroupPage
            },
            'homegroupsviewer': {
                afterrender: this.onHomeGroupsAfterRender
            },
            'homebelonggroupsviewer': {
                afterrender: this.onHomeBelongGroupsAfterRender
            },
            "addgrouppopup": {
                onSaveAction: this.saveGroup,
                onCloseWindows: this.closeWindows
            }
        });
    },

    onShowGroupPage: function(agrComponent, argRow, argIndex){
        var tmpModel = argIndex;
        this.onShowGroupDetailView(tmpModel.getData().id);

    },

    onShowBelongGroupPage: function(agrComponent, argRow, argIndex){
        var tmpModel = argIndex;
        this.onShowBelongGroupDetailView(tmpModel.getData().id);

    },


    onHomeGroupsInfoLoad:function () {
        var tmpGroupsDTO = Ext.getStore('GroupsDTO');
        tmpGroupsDTO.load({
            scope: this,
            callback: this.onLoadMyGroupsResult
        });
    },

    onLoadMyGroupsResult:function(argRecords,argOperation,argSuccess){
        if(argSuccess){
            var tmpBelongGroups = Ext.getStore('BelongGroups');
            tmpBelongGroups.removeAll();
            var tmpBelongGroupsList = argRecords[0].data.belongToGroups;
            var tmpGroupsList = argRecords[0].data.myGroups;
            var tmpGroups = Ext.getStore('Groups');
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
        Ext.state.Manager.set('groupId',this.selectedGroupElement);
        this.onLoadUsersGroup();
        this.navigateToGroupView('Groups', this.selectedGroupElement);
    },

    onLoadUsersGroup: function(){
        var tmpUsersGroupStore = Ext.getStore('GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl
        });
    },

    /**
     * Show GroupDetailView when user click on the imagen in home
     * */
    onShowBelongGroupDetailView: function(argElement){
        this.navigateToGroupView('BelongGroups', argElement);
    },

    /**
     * Change the view to groupDetail,
     * Parameter defines the store that you want to extract the model
     * */
    navigateToGroupView: function(agrStore, argElement){
        var tmpGroupsStore = Ext.getStore(agrStore);
        var tmpModel = tmpGroupsStore.findRecord('id', argElement);
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE,'groupDetailPage');
    },

    onDeleteGroup: function(argElement){
        var tmpGroupStore = Ext.getStore('Groups');
        var tmpGroup = tmpGroupStore.findRecord('id', argElement.getAttribute('id'));
        tmpGroup.setProxy({
            type: 'restproxy',
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_GROUP,argElement.getAttribute('id'))
        });
        tmpGroup.destroy({
            scope: this,
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_GROUP,argElement.getAttribute('id'))
        });
        tmpGroupStore.removeAt(tmpGroupStore.find('id', argElement.getAttribute('id')));
        tmpGroupStore.commitChanges();
    },

    onConfirmDeleteDialog: function(argEvent, argElement) {
        Ext.MessageBox.confirm(
            'Confirm',
            Locales.AliveTracker.HOME_DELETE_PROJECT_CONFIRMATION_MESSAGE,
            function(argButton){
                if(argButton == 'yes')
                {
                    this.onDeleteGroup(argElement)
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
        var tmpModel = Ext.create('AliveTracker.model.Group');
        tmpGroupForm.loadRecord(tmpModel);
        tmpAddEditGroupPopUp.show();
        return tmpAddEditGroupPopUp;
    },

    saveGroup: function(argEvent){
        var tmpForm = argEvent.getComponent(0).getComponent(0).items.items;
        var tmpGroupModel = this.onCreateModelFromGroupModelValues();
        var tmpGroupStore = Ext.getStore('Groups');
        tmpGroupModel.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.SAVE_GROUP
        });
        tmpGroupModel.save({
            scope: this,
            urlOverride: AliveTracker.defaults.WebServices.SAVE_GROUP
        });
        tmpGroupStore.add(tmpGroupModel);
        tmpGroupStore.commitChanges();
        this.closeWindows(argEvent);
    },

    onCreateGroupResult: function(argRecords,argOperation,argSuccess){
        Framework.core.ModelLocator.loggedUser = argRecords[0];
        Framework.core.EventBus.fireEvent(Framework.core.FrameworkEvents.EVENT_SHOW_PAGE, 'homePage');
    },

    onCreateModelFromGroupModelValues: function(){
        var tmpItem = this.getGroupModelForm().getValues();
        var tmpModel = Ext.create('AliveTracker.model.Group', {
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