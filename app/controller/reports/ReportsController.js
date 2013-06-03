Ext.define('AliveTracker.controller.reports.ReportsController', {

    extend: 'Ext.app.Controller',

    views : [
        'reports.Reports'
    ],

    models:[
        'reports.Report'
    ],

    stores:[
        'users.Users',
        'reports.LogReport',
        'reports.Reports',
        'projects.ProjectDetails'
    ],

    refs: [
        {
            ref: 'reportsform',
            selector: 'reportsform [itemId=reportFormContainer]'
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
            ref: 'gridPreview',
            selector: 'reportsform [itemId=gridReports]'
        },
        {
            ref: 'exportButton',
            selector: 'reportsform [itemId=btnExport]'
        }
    ],

    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'reportsform': {
                beforeshow: this.onBeforeShow,
                hide: this.onHide,
                exportReport: this.onExportReport,
                dateRangeComboSelection: this.onDateRangeComboSelection,
                groupSelected: this.loadUsersStore,
                showPreview: this.onShowPreview,
                sortColumn: this.changeColumnBackground,
                comboItemSelected: this.enablePreviewButton
            },
            'daterange':{
                dateSelected: this.enablePreviewButton
            }
        });
    },

    onBeforeShow: function(){
        var tmpField = this.getDateRange();
        var tmpProjectStore = Ext.getStore('projects.Projects');
        tmpField.setHiddenProperty(true);
        if(this.userHasAllPermissions()){
            var tmpProject = Ext.create('AliveTracker.model.projects.Project',{
                name: Locales.AliveTracker.REPORTS_ALL_PROJECTS
            });
            if(tmpProjectStore.getAt(0).data.id != 0){
                tmpProjectStore.insert(0,tmpProject);
                tmpProjectStore.commitChanges();
            }
        }
    },

    onHide: function(){
        var tmpProjectStore = Ext.getStore('projects.Projects');
        if(tmpProjectStore.getAt(0).data.id == 0){
            tmpProjectStore.removeAt(0);
            tmpProjectStore.commitChanges();
        }
    },

    onDateRangeComboSelection: function(){
        var tmpValue = this.getCmbDateRange().value;
        var tmpField = this.getDateRange();
        if(tmpValue == AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION){
            tmpField.setHiddenProperty(false);
            return;
        }
        tmpField.setHiddenProperty(true);
    },

    /**
     * Exports the report
     */
    onExportReport: function(){
        var tmpReportsForm = this.getReportsform();
        if( !tmpReportsForm.isValid() ){
            return;
        }
        var tmpModel = tmpReportsForm.getRecord();
        tmpModel.set('group',Ext.state.Manager.get('groupId'));
        tmpModel.set('startDate',this.getDateRange().getStartValue());
        tmpModel.set('endDate',this.getDateRange().getEndValue());
        tmpModel.save({
            scope:this,
            callback:this.saveReportCallback
        });
    },

    saveReportCallback: function(record, operation){
        if(operation.success){
            var tmpReport = record.data;
            window.open(AliveTracker.defaults.WebServices.LOG_EXPORT_REPORT+'?'+
                            Ext.Object.toQueryString({group:tmpReport.group,user:tmpReport.user,project:tmpReport.project,
                                                      dateRangeOption:tmpReport.dateRangeOption,startDate:tmpReport.startDate,endDate:tmpReport.endDate}));
        }
    },

    loadUsersStore: function(){
        var tmpProjectId = this.getCmbProject();
        var tmpUsersStore = Ext.getStore('users.Users');
        this.getCmbUser().clearValue();
        if(tmpProjectId.value == 0){
            var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP, Ext.state.Manager.get('groupId'));
            tmpUsersStore.load({
                scope: this,
                urlOverride:  tmpStoreUrl,
                callback: this.enableAdminUsersCombo
            });
            return;
        }
        if(this.userHasAllPermissions() || this.isProjectAdmin(Framework.core.SecurityManager.getCurrentUsername())){
            var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP_AND_PROJECT,Ext.state.Manager.get('groupId'),tmpProjectId.value);
            tmpUsersStore.load({
                scope: this,
                urlOverride:  tmpStoreUrl,
                callback: this.enableAdminUsersCombo
            });
            return;
        }
        var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_ALL_USERS, Framework.core.SecurityManager.getCurrentUsername());
        tmpUsersStore.load({
            scope: this,
            urlOverride:  tmpStoreUrl,
            callback: this.enableUsersCombo
        });
    },

    enableUsersCombo: function(){
        this.getCmbUser().setDisabled(false);
    },

    enableAdminUsersCombo: function(){
        this.getCmbUser().setDisabled(false);
        var tmpUsersStore = Ext.getStore('users.Users');
        var tmpUser = Ext.create('AliveTracker.model.users.User',{
            email: Locales.AliveTracker.REPORTS_ALL_USERS
        });
        tmpUsersStore.insert(0,tmpUser);
        tmpUsersStore.commitChanges();
    },

    userHasAllPermissions: function(){
        var tmpLoginUsersStore = Ext.getStore('users.LoginUsers');
        var tmpIdPermission = tmpLoginUsersStore.getAt(0).getData().idpermission;
        if(tmpIdPermission == 1){
            return true;
        }
        return false;
    },

    isProjectAdmin: function(argEmail){
        var tmpAssignedUsersStore = Ext.getStore('users.AssignedUsers');
        for(var tmpIndex=0;tmpIndex < tmpAssignedUsersStore.getCount();tmpIndex++){
            var tmpUser = tmpAssignedUsersStore.getAt(tmpIndex);
            if(tmpUser.get('name')==argEmail && tmpUser.get('role')=='admin'){
                return true;
            }
        }
        return false;
    },

    onShowPreview: function(){
        var tmpReportsForm = this.getReportsform();
        if( !tmpReportsForm.isValid() ){
            return;
        }
        var tmpGroup = Ext.state.Manager.get('groupId');
        var tmpProject = this.getCmbProject().value;
        var tmpUser = this.getCmbUser().value;
        var tmpDateRange = this.getCmbDateRange().value;
        var tmpBaseUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.LOG_LIST_REPORT,tmpGroup,tmpProject,tmpUser,tmpDateRange);
        var tmpUrl = this.buildDateQueryString(this.getDateRange().getStartValue(), this.getDateRange().getEndValue(), tmpBaseUrl)
        var tmpReportsStore = Ext.getStore('reports.Reports');
        tmpReportsStore.load({
            scope: this,
            urlOverride:tmpUrl,
            callback: this.onloadReportSuccess
        });
    },

    onloadReportSuccess: function(){
        var tmpReportsStore = Ext.getStore('reports.Reports');
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        if(tmpReportsStore.getCount() > 0){
            for(var tmpIndex=0; tmpIndex < tmpReportsStore.getCount(); tmpIndex++){
                var tmpReport = tmpReportsStore.getAt(tmpIndex);
                var tmpUser = this.getUserByIndex(tmpReport.get('user'));
                tmpReport.set('user_name',tmpUser);
                tmpReportsStore.commitChanges();
            }
            this.getExportButton().setDisabled(false);
            return;
        }
        Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.NO_DATA_TO_SHOW);
        this.getExportButton().setDisabled(true);
    },

    getUserByIndex: function(argUserId){
        var tmpUsersGroupStore = Ext.getStore('users.GroupUsers');
        for(var tmpIndex=0; tmpIndex <tmpUsersGroupStore.getCount(); tmpIndex++){
            var tmpUser = tmpUsersGroupStore.getAt(tmpIndex);
            if(tmpUser.get('id')==argUserId){
                return tmpUser.get('name');
            }
        }
    },

    enablePreviewButton: function(){
        var tmpReportsForm = this.getReportsform();
        var tmpDateRange = this.getCmbDateRange().value;
        var tmpStartDate = this.getDateRange().getStartValue();
        var tmpEndDate = this.getDateRange().getEndValue();
        if(tmpDateRange || (tmpDateRange == AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION)){
            if(tmpDateRange == AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION){
                tmpReportsForm.down('button[itemId=btnPreview]').setDisabled(true);
                if(!(tmpStartDate && tmpEndDate)){
                    return;
                }
            }
            tmpReportsForm.down('button[itemId=btnPreview]').setDisabled(false);
        }
    },

    changeColumnBackground: function(argColumn){
        argColumn.removeCls('report-grid-column');
        argColumn.addCls('report-grid-sort-column');
    },

    buildDateQueryString: function(argStartDate, argEndDate, argUrl){
        if(argStartDate && argEndDate){
            argUrl+= '?'+Ext.Object.toQueryString({startDate: argStartDate, endDate: argEndDate});
        }
        return argUrl;
    }

});