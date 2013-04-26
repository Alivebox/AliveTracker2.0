Ext.define("AliveTracker.controller.projects.LogBookController", {

    extend:"Ext.app.Controller",

    views:[
        'projects.LogBook',
        'projects.LogBookActivityForm',
        'projects.LogBookGrid'
    ],

    models:[
        'projects.Project',
        'projects.LogBook',
        'projects.Log'
    ],

    stores:[
        'projects.Projects',
        'projects.Logs'
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
            selector:'logbook [itemId=totalTime]'
        },
        {
            ref:'logBookActivityForm',
            selector:'logbookactivityform'
        },
        {
            ref:'logBookActivityField',
            selector:'logbookactivityform [itemId=txtActivity]'
        },
        {
            ref:'logBookTimeTextField',
            selector:'logbookactivityform [itemId=time]'
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
        this.populateLogsStore(tmpUrl, this.onTotalTimeUpdate);
        if(Ext.getStore('projects.Projects').count() === 0){
            this.populateProjectStore();
        }
    },
    populateProjectStore: function(){
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_PROJECTS,Ext.state.Manager.get('groupId'));
        var tmpProjectStore = Ext.getStore('projects.Projects');
        tmpProjectStore.load({
                scope: this,
                urlOverride: tmpUrl
            }
        );
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
        var tmpLogBookStore = Ext.getStore('projects.Logs');
        tmpLogBookStore.add(argActivity);
        this.onClearUsersSelection();
        this.onTotalTimeUpdate();
    },
    onClearUsersSelection:function () {
        this.getLogBookActivityField().setValue('');
        this.getLogBookTimeTextField().setValue(1);
    },
    onDatePickerChange:function () {
        Ext.getStore('projects.Logs').removeAll();
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl, this.onTotalTimeUpdate);
    },
    onSaveLogHistory:function () {
        var tmpLogArray = [];
        tmpLogArray = this.getItemsFromStore(Ext.getStore('projects.Logs'));
        if(tmpLogArray.length == 0){
            Ext.Msg.alert(Locales.AliveTracker.WARNING_MESSAGE, Locales.AliveTracker.NO_DATA_TO_SAVE);
            return;
        }
        var tmpLogBook = Ext.create('AliveTracker.model.projects.LogBook', {
            date:this.getDatepicker().getValue(),
            group: Ext.state.Manager.get('groupId'),
            activities:tmpLogArray
        });
        tmpLogBook.save({
            scope: this,
            callback: this.saveCallback
        });
    },
    saveCallback: function(record, operation){
        if(operation.success){
            Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.PROJECTS_LOG_SAVE_SUCCESS);
            return;
        }
    },
    getItemsFromStore:function (argStore){
        var tmpArray = [];
        for(var i=0; i < argStore.data.items.length; i++){
            tmpArray.push(argStore.data.items[i].data)
        }
        return tmpArray;
    }
});