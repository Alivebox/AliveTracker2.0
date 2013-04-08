Ext.define('AliveTracker.controller.reports.ReportsController', {

    extend: 'Ext.app.Controller',

    views : [
        'reports.Reports'
    ],

    models:[
        'Project',
        'User'
    ],

    stores:[
        'Projects',
        'Users'
    ],

    refs: [
        {
            ref: 'reportsform',
            selector: 'reportsform'
        },
        {
            ref: 'cmbProject',
            selector: 'reportsform [itemId=projectReports]'
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
                loadUsersStore: this.loadUsersStore
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
        var tmpModel = Ext.create('AliveTracker.model.reports.ReportForm');
        tmpReportsFormBasic.updateRecord(tmpModel);
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
    }

});