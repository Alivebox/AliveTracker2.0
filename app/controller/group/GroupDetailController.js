Ext.define('AliveTracker.controller.group.GroupDetailController', {

    extend: "Ext.app.Controller",

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

    views:[
        'group.GroupDetail',
        'group.GroupsView',
        'group.BelongGroupsView',
        'group.Groups',
        'group.AddGroupPopUp'
    ],

    requires : [
        'AliveTracker.view.users.UsersGrid',
        'AliveTracker.view.projects.GroupProjects'
    ],

    refs: [
        {
            ref:'datepicker',
            selector:'logbook [itemId=datepickerLogBook]'
        },
        {
            ref:'totalTime',
            selector:'logbook [itemId=totalTime]'
        },
        {
            ref:'GroupTab',
            selector:'groupdetailform [itemId=GroupTab]'
        },
        {
            ref:'GroupsView',
            selector:'groupdetailform [itemId=groupsView]'
        },
        {
            ref:'BelongGroupsView',
            selector:'groupdetailform [itemId=belongGroupsView]'
        },
        {
            ref:'groupModelForm',
            selector:'addgrouppopup form[name=groupModelForm]'
        },
        {
            ref:'logbookForm',
            selector:'logbookactivityform [itemId=logFormContainer]'
        },
        {
            ref:'reportForm',
            selector:'reportsform [itemId=reportFormContainer]'
        }
    ],

    init: function(){
        this.control(
            {
                'groups': {
                    beforerender : this.loadStores,
                    addGroup: this.createNewGroup
                },
                "addgrouppopup": {
                    saveGroup: this.saveGroup,
                    closeWindow: this.closeWindow
                }
            });
    },

    loadStores:function () {
        var tmpGroupsDTO = Ext.getStore('groups.GroupsDTO');
        tmpGroupsDTO.load({
            scope: this,
            callback: this.onLoadUserGroupsResult
        });
    },

    onLoadUserGroupsResult:function(argRecords,argOperation,argSuccess){
        if(argSuccess){
            var tmpBelongGroups = Ext.getStore('groups.BelongGroups');
            tmpBelongGroups.removeAll();
            var tmpBelongGroupsList = argRecords[0].data.belongToGroups;
            var tmpGroupsList = argRecords[0].data.myGroups;
            var tmpGroups = Ext.getStore('groups.Groups');
            tmpGroups.removeAll();
            for (var tmpCont = 0; tmpCont <= tmpBelongGroupsList.length-1; tmpCont++){
                var tmpBelongGroup = tmpBelongGroupsList[tmpCont];
                tmpBelongGroups.add(tmpBelongGroup)
            }
            for (var tmpCont = 0; tmpCont <= tmpGroupsList.length-1; tmpCont++){
                var tmpGroup = tmpGroupsList[tmpCont];
                tmpGroups.add(tmpGroup)
            }
        }
        this.loadTemplateItemsEvents();
    },

    loadTemplateItemsEvents: function(){
        var tmpItemDisplayEl = this.getGroupsView().getEl();
        var tmpBelongGroupDisplay = this.getBelongGroupsView().getEl();
        var tmpGroupsStore = Ext.getStore('groups.Groups');
        var tmpBelongGroupsStore = Ext.getStore('groups.BelongGroups');
        for(var tmpIndex=0; tmpIndex < tmpGroupsStore.getCount(); tmpIndex++){
            var tmpGroup = tmpGroupsStore.getAt(tmpIndex);
            tmpItemDisplayEl.on('click', this.onGroupSelected, this, { delegate: '#'+ tmpGroup.get('id') });
            tmpItemDisplayEl.on('click', this.showEditGroupPopUp, this, { delegate: '#btnEdit'+ tmpGroup.get('id') });
            tmpItemDisplayEl.on('click', this.confirmDeleteDialog, this, { delegate: '#btnDelete'+ tmpGroup.get('id') });
            tmpItemDisplayEl.on('mouseover', this.showDivButtons, this, { delegate: '#div'+ tmpGroup.get('id') });
            tmpItemDisplayEl.on('mouseout', this.hideDivButtons, this, { delegate: '#div'+ tmpGroup.get('id') });
        }
        for(var tmpIndex=0; tmpIndex < tmpBelongGroupsStore.getCount(); tmpIndex++){
            var tmpBelongGroup = tmpBelongGroupsStore.getAt(tmpIndex);
            tmpBelongGroupDisplay.on('click', this.onGroupSelected, this, { delegate: '#'+ tmpBelongGroup.get('id') });
        }
        this.loadDefaultGroup(tmpGroupsStore,tmpBelongGroupsStore);
    },

    loadDefaultGroup: function(argGroupsStore, argBelongGroupsStore){
        if(argGroupsStore.getCount() > 0){
            this.setDefaultGroupElements(argGroupsStore);
            return;
        }
        if(argBelongGroupsStore.getCount() > 0){
            this.setDefaultGroupElements(argBelongGroupsStore);
        }
    },

    setDefaultGroupElements: function(argStore){
        var tmpGroupId = argStore.getAt(0).data.id;
        Ext.state.Manager.set('groupId',tmpGroupId);
        var tmpGroupSelected = Ext.get(tmpGroupId.toString());
        tmpGroupSelected.addCls('x-item-selected');
        this.loadGroupProjects();
    },

    loadNewButtonsEvents: function(argId){
        var tmpItemDisplayEl = this.getGroupsView().getEl();
        tmpItemDisplayEl.on('click', this.onGroupSelected, this, { delegate: '#'+ argId });
        tmpItemDisplayEl.on('click', this.showEditGroupPopUp, this, { delegate: '#btnEdit'+ argId });
        tmpItemDisplayEl.on('click', this.confirmDeleteDialog, this, { delegate: '#btnDelete'+ argId });
        tmpItemDisplayEl.on('mouseover', this.showDivButtons, this, { delegate: '#div'+ argId });
        tmpItemDisplayEl.on('mouseout', this.hideDivButtons, this, { delegate: '#div'+ argId });
    },

    loadGroupProjects: function(){
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_PROJECTS, Ext.state.Manager.get('groupId'));
        var tmpProjectStore = Ext.getStore('projects.Projects');
        tmpProjectStore.load({
                scope: this,
                urlOverride: tmpUrl,
                callback: this.loadGroupUsers
            }
        );
    },

    loadGroupUsers: function(){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
        tmpUsersGroupStore.load({
            scope: this,
            urlOverride:  tmpUrl,
            callback: this.loadRolesStore
        });
    },

    loadRolesStore: function(){
        var tmpRoleStore = Ext.getStore('roles.Roles');
        var tmpUrlOverride = AliveTracker.defaults.WebServices.GET_ROLES;
        tmpRoleStore.load({
            scope: this,
            urlOverride: tmpUrlOverride,
            callback: this.loadPermissionsStore
        });
    },

    loadPermissionsStore: function(){
        var tmpLoginUsersStore = Ext.getStore('users.LoginUsers');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS,Ext.state.Manager.get('groupId'));
        tmpLoginUsersStore.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.GET_GROUP_PERMISSIONS
        });
        tmpLoginUsersStore.load({
            scope: this,
            urlOverride:  tmpUrl,
            callback: this.setPermissions
        });
    },

    setPermissions: function(argRecord){
        var tmpIdPermission = argRecord[0].getData().idpermission;
        if(!this.userHasAllPermissions(tmpIdPermission)){
            this.getGroupTab().setTabsVisibilityByIndex(1,false);
            this.getGroupTab().setTabsVisibilityByIndex(2,false);
        }
        else{
            this.getGroupTab().setTabsVisibilityByIndex(1,true);
            this.getGroupTab().setTabsVisibilityByIndex(2,true);
        }
        this.getGroupTab().setVisible(true);
        this.reloadLogStore();
    },

    userHasAllPermissions: function(argRecord){
        if(argRecord == 1){
            return true;
        }
        return false;
    },

    onGroupSelected: function(argEvent,argButton){
        var beforeGroupId=  Ext.state.Manager.get('groupId').toString();
        var tmpBeforeGroup = Ext.get(beforeGroupId);
        var tmpGroupSelected = Ext.get(argButton.id);
        if(tmpBeforeGroup){
            tmpBeforeGroup.removeCls('x-item-selected');
        }
        tmpGroupSelected.addCls('x-item-selected');
        var tmpGroupTab = this.getGroupTab();
        var tmpGroupId = argButton.id;
        Ext.state.Manager.set('groupId',tmpGroupId);
        this.reloadLogStore();
        this.clearLogBookFields();
        this.clearReportFields();
        tmpGroupTab.onSetFirstTabSelected();
        tmpGroupTab.setVisible(false);
        this.loadGroupProjects();
    },

    reloadLogStore: function (){
        Ext.getStore('projects.Logs').removeAll();
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl, this.updateTotalTime);
    },

    populateLogsStore:function (argUrl, argCallback){
        var tmpLogsStore = Ext.getStore('projects.Logs');
        tmpLogsStore.load({
            scope: this,
            urlOverride: argUrl,
            callback: argCallback
        });
    },

    updateTotalTime:function () {
        var tmpTotal = 0;
        var tmpStore = Ext.getStore('projects.Logs');
        tmpStore.each(function (record) {
            tmpTotal += record.data.time;
        }, this);
        this.getTotalTime().setValue(tmpTotal);
    },

    clearLogBookFields: function(){
        this.getLogbookForm().down('combobox[itemId=logProjectComboBox]').setValue(Locales.AliveTracker.PROJECTS_LABEL_SELECT);
        this.getLogbookForm().down('textfield[itemId=txtActivity]').setValue("");
        this.getLogbookForm().down('numberfield[itemId=time]').setValue(0);
    },

    clearReportFields: function(){
        this.getReportForm().down('combobox[itemId=projectReports]').setValue(Locales.AliveTracker.REPORTS_LABEL_SELECT);
        this.getReportForm().down('combobox[itemId=userReports]').setValue(Locales.AliveTracker.REPORTS_LABEL_SELECT);
        this.getReportForm().down('combobox[itemId=dateRangeComboReports]').setValue(Locales.AliveTracker.REPORTS_LABEL_SELECT);
        Ext.getStore('reports.Reports').removeAll();
    },

    showDivButtons: function(argEvent, argDiv){
        var tmpDivId = 'divButtons'+argDiv.attributes[1].value;
        var tmpDiv = Ext.get(tmpDivId)
        tmpDiv.setVisible(true);
    },

    hideDivButtons: function(argEvent, argDiv){
        var tmpDivId = 'divButtons'+argDiv.attributes[1].value;
        var tmpDiv = Ext.get(tmpDivId)
        tmpDiv.setVisible(false);
    },

    createNewGroup: function(argElement){
        var tmpAddEditGroupPopUp = Ext.create('AliveTracker.view.group.AddGroupPopUp');
        tmpAddEditGroupPopUp.show();
    },

    saveGroup: function(argWindow){
        var tmpGroupModel = this.createModelGroup();
        var tmpId = tmpGroupModel.data.id;
        tmpGroupModel.setProxy({
            type: 'restproxy',
            url: AliveTracker.defaults.WebServices.SAVE_GROUP
        });
        if(this.isInsertAction(tmpId)){
            tmpGroupModel.save({
                scope: this,
                urlOverride: AliveTracker.defaults.WebServices.SAVE_GROUP,
                success: this.saveGroupCallback
            });
        }
        else{
            tmpGroupModel.save({
                scope: this,
                urlOverride: AliveTracker.defaults.WebServices.SAVE_GROUP,
                success: this.editGroupCallback
            });
        }
        this.closeWindow(argWindow);
    },

    createModelGroup: function(){
        var tmpItem = this.getGroupModelForm().getValues();
        var tmpModel = Ext.create('AliveTracker.model.groups.Group', {
            id: tmpItem.id,
            name: tmpItem.name,
            description: tmpItem.description,
            logo_url: tmpItem.logo_url,
            web_site_url: tmpItem.web_site_url
        });
        return tmpModel;
    },
    
    isInsertAction: function(argItemId){
        if(argItemId == 0){
            return true;
        }    
        return false;
    },

    saveGroupCallback: function(argRecord){
        var tmpGroupStore = Ext.getStore('groups.Groups');
        tmpGroupStore.add(argRecord);
        tmpGroupStore.commitChanges();
        this.loadNewButtonsEvents(argRecord.data.id);
    },

    editGroupCallback: function(argRecord){
        var tmpGroupStore = Ext.getStore('groups.Groups');
        for(var tmpIndex=0; tmpIndex < tmpGroupStore.getCount(); tmpIndex++){
            var tmpGroup = tmpGroupStore.getAt(tmpIndex);
            if(tmpGroup.get('id')==argRecord.data.id){
                tmpGroup=argRecord;
                break;
            }
        }
        tmpGroupStore.removeAt(tmpIndex);
        tmpGroupStore.insert(tmpIndex,tmpGroup);
        tmpGroupStore.commitChanges();
    },
    
    confirmDeleteDialog: function(argEvent,argButton) {
        var tmpGroupId=argButton.name;
        Ext.MessageBox.confirm(
            'Confirm',
            Locales.AliveTracker.HOME_DELETE_GROUP_CONFIRMATION_MESSAGE,
            function(argButton){
                if(argButton == 'yes')
                {
                    this.deleteGroup(tmpGroupId)
                }
            },
            this
        );
    },

    deleteGroup: function(argGroupId){
        var tmpGroupStore = Ext.getStore('groups.Groups');
        var tmpGroup = tmpGroupStore.findRecord('id', argGroupId);
        var tmpGroupTab = this.getGroupTab();
        tmpGroup.setProxy({
            type: 'restproxy',
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_GROUP,argGroupId)
        });
        tmpGroup.destroy({
            scope: this,
            urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.DELETE_GROUP,argGroupId)
        });
        tmpGroupStore.removeAt(tmpGroupStore.find('id', argGroupId));
        if(argGroupId==Ext.state.Manager.get('groupId')){
            tmpGroupTab.setVisible(false);
        }
        tmpGroupStore.commitChanges();
    },

    showEditGroupPopUp: function(argEvent,argButton){
        var tmpGroupId=argButton.name;
        var tmpGroupModel = this.findGroupRecord(tmpGroupId);
        this.getGroupPopUp(tmpGroupModel);
    },

    findGroupRecord: function(argGroupId){
        var tmpGroupsStore = Ext.getStore('groups.Groups');
        for(var tmpIndex=0; tmpIndex < tmpGroupsStore.getCount(); tmpIndex++){
            var tmpGroup = tmpGroupsStore.getAt(tmpIndex);
            if(tmpGroup.get('id')==argGroupId){
                return tmpGroup;
            }
        }
    },

    getGroupPopUp: function(argModel){
        var tmpAddEditGroupPopUp = Ext.create('AliveTracker.view.group.AddGroupPopUp');
        var tmpGroupForm = this.getGroupModelForm();
        tmpGroupForm.loadRecord(argModel);
        tmpAddEditGroupPopUp.show();
        return tmpAddEditGroupPopUp;
    },

    closeWindow: function(argWindow){
        argWindow.close();
    }
});