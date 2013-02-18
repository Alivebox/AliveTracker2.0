Ext.define("AliveTracker.controller.projects.LogBookController", {

    extend:"Ext.app.Controller",
    refs:[
        {
            ref:'logBookForm',
            selector:'logbookform'
        },
        {
            ref:'logBookGridHeader',
            selector:'logbookgridheader'
        },
        {
            ref:'logBookGrid',
            selector:'logbookgrid'
        },
        {
            ref: 'totalTime',
            selector: 'logbookform label[itemId=totalTime]'
        }
    ],
    requires:[
        'AliveTracker.view.projects.LogBookForm',
        'AliveTracker.view.projects.LogBookGridHeader',
        'AliveTracker.view.projects.LogBookGrid'
    ],

    models:[
        'Group',
        'Project',
        'projects.LogBook'
    ],

    stores:[
        'Groups',
        'Projects',
        'LogBook'
    ],

    /**
     *Initialization of all items
     */
    init:function () {
        this.control({
            'logbookform':{
                afterrender:this.onUserAfterRender,
                newActivity:this.onAddNewActivity,
                datePickerChanged:this.onDatePickerChange

            }
        });
    },

    /**
     *Function called after renderization
     */
    onUserAfterRender:function () {
        this.onTotalTimeUpdate();
    },

    /**
     * Calculates the sum of all time expended on one day
     */
    onTotalTimeUpdate: function(){
        var tmpTotal = 0;
        var tmpStore = this.getLogBookGrid().getStore();
        tmpStore.each(function(record){
            tmpTotal += record.data.time;
        },this);
        this.getTotalTime().setText('Total: ' + tmpTotal + ' h');
    },

    /**
     * Load previous group data stored
     */
    loadGroupStore:function () {
        var tmpGroupsStore = Ext.getStore('Groups');
        tmpGroupsStore.load({
            callback:function () {
            }
        });
    },

    /**
     * Load previous project data stored
     */
    loadProjectStore:function () {
        var tmpProjectsStore = Ext.getStore('Projects');
        tmpProjectsStore.load({
            callback:function () {
            }
        });
    },

    /**
     * Create a new activity and add to the store
     */
    onAddNewActivity:function (argEvent) {
        var tmpLogBookFormBasic = this.getLogBookForm().getForm();
        if (!tmpLogBookFormBasic.isValid()) {
            return;
        }
        var tmpModel = Ext.create('AliveTracker.model.projects.LogBook');
        tmpLogBookFormBasic.updateRecord(tmpModel);
        var tmpLogBookStore = Ext.getStore('LogBook');
        tmpLogBookStore.add(tmpModel);
        this.onClearUsersSelection();
        this.onTotalTimeUpdate();
    },

    /**
     * Clears all editable components on screen
     */
    onClearUsersSelection: function(){
        this.getLogBookGridHeader().projectComboBox.reset();
        this.getLogBookGridHeader().activityTextField.reset();
        this.getLogBookGridHeader().timeTextField.reset();
    },

    /**
     * Handles all the logic asociated to the date changed action
     * @param argDatePicker component
     */
    onDatePickerChange: function(argDatePicker){
        argDatePicker.getValue();
        this.getLogBookGrid().getStore().removeAll();
        this.onTotalTimeUpdate();
    }

});