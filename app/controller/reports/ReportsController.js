Ext.define('AliveTracker.controller.reports.ReportsController', {

    extend: 'Ext.app.Controller',

    views : [
        'reports.Reports'
    ],

    models:[
        'Project',
        'User',
        'reports.Report'
    ],

    stores:[
        'Projects',
        'Users',
        'LogReport',
        'Reports'
    ],

    refs: [
        {
            ref: 'reportsform',
            selector: 'reportsform'
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

    onDateRangeComboSelection: function(argValue, argField){
        if(argValue == AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION){
            argField.setHiddenProperty(false);
        }else{
            argField.setHiddenProperty(true);
        }
    },

    /**
     * Exports the report
     */
    onExportReport: function(){
        var tmpReportsFormBasic = this.getReportsform().getForm();
        if( !tmpReportsFormBasic.isValid() ){
            return;
        }
        var tmpModel = Ext.create('AliveTracker.model.reports.ReportForm',{
            group: Ext.state.Manager.get('groupId'),
            project: this.getCmbProject().value,
            user: this.getCmbUser().value,
            dateRangeOption:this.getCmbDateRange().value,
            startDate:this.getDateRange().getStartValue(),
            endDate:this.getDateRange().getEndValue()
        });
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
        var tmpUsersStore = Ext.getStore('Users');
        var tmpStoreUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_USERS_GROUP_AND_PROJECT,Ext.state.Manager.get('groupId'),tmpProjectId.value);
        tmpUsersStore.load({
            scope: this,
            urlOverride:  tmpStoreUrl,
            callback: function(records, operation, success) {
                console.log(records);
            }
        });
    },

    /**
     * Loads the Groups store
     */
    loadGoupsStore: function(){
        var tmpGroupsStore = Ext.getStore('Groups');
        tmpGroupsStore.load({
            callback: function(){
            }
        });
    },

    onShowPreview: function(){
        var tmpGroup = Ext.state.Manager.get('groupId');
        var tmpProject = this.getCmbProject().value;
        var tmpUser = this.getCmbUser().value;
        var tmpDateRange = this.getCmbDateRange().value;
        var tmpStartDate = this.getDateRange().getStartValue();
        var tmpEndDate = this.getDateRange().getEndValue();
        debugger;
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.LOG_LIST_REPORT,tmpGroup,tmpProject,tmpUser,tmpDateRange);
        var tmpReportsStore = Ext.getStore('Reports');
        tmpReportsStore.load({
            scope: this,
            urlOverride:tmpUrl,
            callback: this.onLoadPreviewRecords
        });
    },

    onLoadPreviewRecords: function(argRecords, argOperation, argSuccess){
        debugger;
        var tmpGridReports = this.getGridPreview();
        tmpGridReports.setVisible(true);
    }

});