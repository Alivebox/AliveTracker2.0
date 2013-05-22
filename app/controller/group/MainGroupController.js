Ext.define('AliveTracker.controller.group.MainGroupController', {

    extend: "Ext.app.Controller",

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
            ref:'logBookActivityField',
            selector:'logbookactivityform [itemId=txtActivity]'
        },
        {
            ref:'logBookProjectCombo',
            selector:'logbookactivityform [itemId=logProjectComboBox]'
        },
        {
            ref:'logBookTimeTextField',
            selector:'logbookactivityform [itemId=time]'
        },
        {
            ref: 'cmbProject',
            selector: 'reportsform [itemId=projectReports]'
        },
        {
            ref: 'cmbUser',
            selector: 'reportsform [itemId=userReports]'
        },
        {
            ref: 'cmbDateRange',
            selector: 'reportsform [itemId=dateRangeComboReports]'
        },
        {
            ref: 'dateRange',
            selector: 'reportsform [itemId=dateRangeReports]'
        },
        {
            ref:'groupModelForm',
            selector:'addgrouppopup form[name=groupModelForm]'
        }
    ],

    init: function(){
        this.control(
            {
                'groupdetailform': {
                    groupSelected: this.onGroupSelected,
                    addGroup: this.createNewGroup
                }
            });
    },

    loadProjects: function(){
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
            callback: this.getPermissionId
        });
    },

    getPermissionId: function(argRecord){
        var tmpIdPermission = argRecord[0].getData().idpermission;
        this.setPermissions(tmpIdPermission);
        this.getGroupTab().setVisible(true);
    },

    setPermissions: function(argRecord){
        if(!this.userHasAllPermissions(argRecord)){
            this.getGroupTab().setTabsVisibilityByIndex(1,false);
            this.getGroupTab().setTabsVisibilityByIndex(2,false);
            return;
        }
        this.getGroupTab().setTabsVisibilityByIndex(1,true);
        this.getGroupTab().setTabsVisibilityByIndex(2,true);
    },

    userHasAllPermissions: function(argRecord){
        if(argRecord == 1){
            return true;
        }
        return false;
    },

    isEmpty: function(argStore){
        var tmpStore = Ext.getStore(argStore);
        if(tmpStore.getCount() > 0){
            return false;
        }
        return true;
    },

    onGroupSelected: function(argView, argRecord){
        var tmpGroupsView = this.getGroupsView();
        var tmpBelongGroupsView = this.getBelongGroupsView();
        var tmpViewSelected = argView.view.itemId;
        if(tmpViewSelected == tmpGroupsView.itemId){
            tmpBelongGroupsView.getSelectionModel().deselectAll();
        }
        else{
            tmpGroupsView.getSelectionModel().deselectAll();
        }
        var tmpGroupTab = this.getGroupTab();
        var tmpGroupId = argRecord.id;
        Ext.state.Manager.set('groupId',tmpGroupId);
        this.reloadLogStore();
        this.clearLogBookFields();
        this.clearReportFields();
        tmpGroupTab.onSetFirstTabSelected();
        tmpGroupTab.setVisible(false);
        this.loadProjects();
    },

    reloadLogStore: function (){
        Ext.getStore('projects.Logs').removeAll();
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl, this.onTotalTimeUpdate);
    },

    populateLogsStore:function (argUrl, argCallback){
        var tmpLogsStore = Ext.getStore('projects.Logs');
        tmpLogsStore.load({
            scope: this,
            urlOverride: argUrl,
            callback: argCallback
        });
    },

    onTotalTimeUpdate:function () {
        var tmpTotal = 0;
        var tmpStore = Ext.getStore('projects.Logs');
        tmpStore.each(function (record) {
            tmpTotal += record.data.time;
        }, this);
        this.getTotalTime().setValue(tmpTotal);
    },

    clearLogBookFields: function(){
        this.getLogBookProjectCombo().setValue(Locales.AliveTracker.PROJECTS_LABEL_SELECT);
        this.getLogBookActivityField().setValue("");
        this.getLogBookTimeTextField().setValue(0);
    },

    clearReportFields: function(){
        this.getCmbProject().setValue(Locales.AliveTracker.REPORTS_LABEL_SELECT);
        this.getCmbUser().setValue(Locales.AliveTracker.REPORTS_LABEL_SELECT);
        this.getCmbDateRange().setValue(Locales.AliveTracker.REPORTS_LABEL_SELECT);
        Ext.getStore('reports.Reports').removeAll();
    },

    createNewGroup: function(){
        this.addEditGroupPopUp = this.getAddGroupPopUp(true, null);
    },

    getAddGroupPopUp: function(argElement){
        var tmpAddEditGroupPopUp = Ext.create('AliveTracker.view.home.AddGroupPopUp');
        var tmpGroupForm = this.getGroupModelForm();
        var tmpModel = Ext.create('AliveTracker.model.groups.Group');
        tmpGroupForm.loadRecord(tmpModel);
        tmpAddEditGroupPopUp.show();
        return tmpAddEditGroupPopUp;
    }
});