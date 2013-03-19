Ext.define("AliveTracker.controller.projects.LogBookController", {

    extend:"Ext.app.Controller",

    views:[
        'projects.LogBook',
        'projects.LogBookActivityForm',
        'projects.LogBookGrid'
    ],

    models:[
        'Group',
        'Project',
        'projects.LogBook',
        'projects.Log'
    ],

    stores:[
        'Groups',
        'Projects',
        'Logs'
    ],

    refs:[
        {
            ref:'logBook',
            selector:'logbook'
        },
        {
            ref:'datepicker',
            selector:'logbook [itemId=datepickerLogBook]'
        },
        {
            ref:'totalTime',
            selector:'logbook label[itemId=totalTime]'
        },
        {
            ref:'logBookActivityForm',
            selector:'logbookactivityform'
        }
    ],

    init:function () {
        this.control({
            'logbook':{
                datePickerChanged:this.onDatePickerChange,
                saveLogHistory:this.onSaveLogHistory
            },
            'logbookactivityform': {
                addActivity:this.onAddNewActivity
            }
        });
    },

    onTotalTimeUpdate:function () {
        var tmpTotal = 0;
        var tmpStore = Ext.getStore('Logs');
        tmpStore.each(function (record) {
            tmpTotal += record.data.time;
        }, this);
        this.getTotalTime().setText(Locales.AliveTracker.PROJECTS_LABEL_TOTAL + ': ' + tmpTotal + ' h');
    },

    loadGroupStore:function () {
        var tmpGroupsStore = Ext.getStore('Groups');
        tmpGroupsStore.load({
            callback:function () {
            }
        });
    },

    onAddNewActivity:function (argActivity) {
        if( Ext.isEmpty(argActivity) ){
            return;
        }
        argActivity.set("group", 3);
        var tmpLogBookStore = Ext.getStore('Logs');
        tmpLogBookStore.add(argActivity);
        this.onClearUsersSelection();
        this.onTotalTimeUpdate();
    },

    onClearUsersSelection:function () {
        //FIX find method to set empty textField
        //this.getLogBookActivityForm().activityTextField = "";
        //this.getLogBookActivityForm().timeTextField = "";
    },
    onDatePickerChange:function () {
        this.getDatepicker().getValue();
        this.getLogBookGrid().getStore().removeAll();
        this.onTotalTimeUpdate();
    },
    onSaveLogHistory:function () {
        // FIX do a extra function to get store.data[i].items[i]
        var tmpLogArray = [];
        for(var i=0; i < Ext.getStore('Logs').data.items.length; i++){
            tmpLogArray.push(Ext.getStore('Logs').data.items[i].data)
        }
        var tmpLogBook = Ext.create('AliveTracker.model.projects.LogBook', {
            date:this.getDatepicker().getValue(),
            group:3,
            activities:tmpLogArray
        });
        tmpLogBook.save();
    }



});