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
                afterrender:this.onAfterRender,
                datePickerChanged:this.onDatePickerChange,
                saveLogHistory:this.onSaveLogHistory
            },
            'logbookactivityform': {
                addActivity:this.onAddNewActivity
            }
        });
    },

    onAfterRender:function(){
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl);
        this.onTotalTimeUpdate();
    },

    populateLogsStore:function (argUrl){
        var tmpLogsStore = Ext.getStore('Logs');
        tmpLogsStore.load({
            scope: this,
            urlOverride: argUrl
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
        argActivity.set("group", Ext.state.Manager.get('groupId'));
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
        Ext.getStore('Logs').removeAll();
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl);
        this.onTotalTimeUpdate();
    },
    onSaveLogHistory:function () {
        var tmpLogArray = [];
        tmpLogArray = this.getItemsFromStore(Ext.getStore('Logs'));
        var tmpLogBook = Ext.create('AliveTracker.model.projects.LogBook', {
            date:this.getDatepicker().getValue('Y-m-d'),
            group: Ext.state.Manager.get('groupId'),
            activities:tmpLogArray
        });
        tmpLogBook.save();
    },
    getItemsFromStore:function (argStore){
        var tmpArray = [];
        for(var i=0; i < argStore.data.items.length; i++){
            tmpArray.push(argStore.data.items[i].data)
        }
        return tmpArray;
    }
});