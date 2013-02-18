Ext.define('AliveTracker.controller.reports.ReportsController', {

    extend: 'Ext.app.Controller',
    requires : [
        'AliveTracker.view.reports.Reports'
    ],
    models:[
        'Project',
        'User',
        'Group'
    ],

    stores:[
        'Projects',
        'Users',
        'Groups'
    ],
    refs: [
        {
            ref: 'reportsform',
            selector: 'reportsform'
        }
    ],

    /**
     * Initializes components listeners
     */
    init: function(){
        this.control({
            'reportsform': {
                exportReport: this.onExportReport,
                dateRangeComboSelection: this.onDateRangeComboSelection
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
        this.loadProjectsStore();
        this.loadUsersStore();
        this.loadGoupsStore();
    },

    /**
     * Loads the Projects store
     */
    loadProjectsStore: function(){
        var tmpProjectsStore = Ext.getStore('Projects');
        tmpProjectsStore.load({
            callback: function(){
            }
        });
    },

    /**
     * Loads the Users store
     */
    loadUsersStore: function(){
        var tmpUsersStore = Ext.getStore('Users');
        tmpUsersStore.load({
            callback: function(){
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