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
        'reports.Reports'
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
        }
    ],

    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'reportsform': {
                exportReport: this.onExportReport,
                dateRangeComboSelection: this.onDateRangeComboSelection,
                loadUsersStore: this.loadUsersStore,
                showPreview: this.onShowPreview
            }
        });
    },

    onDateRangeComboSelection: function(){
        var tmpValue = this.getCmbDateRange().value;
        var tmpField = this.getDateRange();
        if(tmpValue == AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION){
            tmpField.setHiddenProperty(false);
        }else{
            tmpField.setHiddenProperty(true);
        }
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

    /**
     * Initializes components listeners
     */
    onReportsAfterRender: function(){
        this.loadUsersStore();
        this.loadGoupsStore();
    },

    /**
     * Loads the Users store
     */
    loadUsersStore: function(){
        var tmpProjectId = this.getCmbProject();
        var tmpUsersStore = Ext.getStore('users.Users');
        if(this.userHasAllPermissions()){
            var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP_AND_PROJECT,Ext.state.Manager.get('groupId'),tmpProjectId.value);
        }
        else{
            var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_ALL_USERS, Framework.core.SecurityManager.getCurrentUsername());
        }

        tmpUsersStore.load({
            scope: this,
            urlOverride:  tmpStoreUrl,
            callback: function(records, operation, success) {
                console.log(records);
            }
        });
    },

    userHasAllPermissions: function(){
        var tmpLoginUsersStore = Ext.getStore('users.LoginUsers');
        var tmpIdPermission = tmpLoginUsersStore.getAt(0).getData().idpermission;
        if(tmpIdPermission == 1){
            return true;
        }
        return false;
    },

    /**
     * Loads the Groups store
     */
    loadGoupsStore: function(){
        var tmpGroupsStore = Ext.getStore('groups.Groups');
        tmpGroupsStore.load({
            callback: function(){
            }
        });
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
            callback: this.onLoadPreviewRecords
        });
    },

    onLoadPreviewRecords: function(argRecords, argOperation, argSuccess){
        if(!argSuccess || argRecords.length <= 0){
            this.getGridPreview().setVisible(false);
            return;
        }
        this.getGridPreview().setVisible(true);
    },

    buildDateQueryString: function(argStartDate, argEndDate, argUrl){
        if(argStartDate && argEndDate){
            argUrl+= '?'+Ext.Object.toQueryString({startDate: argStartDate, endDate: argEndDate});
        }
        return argUrl;
    }

});