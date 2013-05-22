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
            ref:'datepicker',
            selector:'logbook [itemId=datepickerLogBook]'
        },
        {
            ref:'totalTime',
            selector:'logbook [itemId=totalTime]'
        },
        {
            ref: 'logsform',
            selector: 'logbookactivityform [itemId=logFormContainer]'
        }
    ],
    init:function () {
        this.control({
            'logbook':{
                datePickerChanged:this.onDatePickerChange
            },
            'logbookactivityform': {
                addActivity:this.onAddNewActivity
            },
            'logbookgrid':{
                deleteLog: this.onShowDeleteConfirm,
                editCell: this.onEditCell,
                sortColumn: this.changeColumnBackground
            }
        });
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
    onAddNewActivity:function () {
        if(!this.getLogsform().isValid() || !this.isTimeValid()){
            return;
        }
        var tmpActivity = this.createActivityInstance();
        tmpActivity.set("group", Ext.state.Manager.get('groupId'));
        var tmpLogBookStore = Ext.getStore('projects.Logs');
        tmpLogBookStore.add(tmpActivity);
        this.onClearUsersSelection();
        this.onTotalTimeUpdate();
        this.onSaveLogHistory();
    },

    createActivityInstance: function(){
        var tmpProjectCombobox = this.getLogsform().down('combobox[itemId=logProjectComboBox]');
        var tmpActivityTextField = this.getLogsform().down('textfield[itemId=txtActivity]');
        var tmpTimeNumberField = this.getLogsform().down('numberfield[itemId=time]');
        var tmpActivity = Ext.create('AliveTracker.model.projects.Log',{
            project: tmpProjectCombobox.getValue(),
            project_name: tmpProjectCombobox.getRawValue(),
            activity: tmpActivityTextField.getValue(),
            time: tmpTimeNumberField.getValue()
        });
        return tmpActivity;
    },

    isTimeValid: function(){
        var tmpTime = this.getLogsform().down('numberfield[itemId=time]').getValue();
        var tmpBeforeTotal = this.getTotalTime().getValue();
        var tmpAfterTotal = tmpTime+tmpBeforeTotal;
        if(tmpTime > 24 || tmpTime < 0 || tmpAfterTotal > 24){
            return false;
        }
        return true;
    },

    onClearUsersSelection:function () {
        var tmpActivityField = this.getLogsform().down('textfield[itemId=txtActivity]');
        tmpActivityField.setValue('');
        this.getLogsform().down('numberfield[itemId=time]').setValue(0);
        tmpActivityField.focus();
    },

    onReloadLogStore: function (){
        Ext.getStore('projects.Logs').removeAll();
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl, this.onTotalTimeUpdate);
    },

    onDatePickerChange:function () {
        this.onReloadLogStore();
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
        tmpLogBook.save();
    },

    getItemsFromStore:function (argStore){
        var tmpArray = [];
        for(var i=0; i < argStore.data.items.length; i++){
            tmpArray.push(argStore.data.items[i].data)
        }
        return tmpArray;
    },

    onEditCell: function(argRecord){
        var tmpLogId = argRecord.record.data.id;
        var tmpActivity = argRecord.record.data.activity;
        var tmpTime = argRecord.record.data.time;
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_LOG,tmpLogId);
        var tmpLogBook = Ext.create('AliveTracker.model.projects.Log', {
            id: tmpLogId,
            activity: tmpActivity,
            time: tmpTime
        });
        tmpLogBook.save({
            urlOverride:tmpUrl
        });
    },

    changeColumnBackground: function(argColumn){
        argColumn.removeCls('logbook-grid-column');
        argColumn.addCls('logbook-grid-sort-column');
    },

    onShowDeleteConfirm: function(argGrid, argIndex){
        this.toDeleteIndex = argIndex;
        Ext.MessageBox.confirm('Confirm', Ext.util.Format.format( Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),this.deleteConfirmCallback, this);
    },
    deleteConfirmCallback:function(argButton){
        if(argButton == 'yes'){
            var tmpLog = Ext.getStore('projects.Logs').getAt(this.toDeleteIndex);
            if(tmpLog.phantom){
                Ext.getStore('projects.Logs').removeAt(this.toDeleteIndex);
                this.onTotalTimeUpdate();
                return;
            }
            tmpLog.destroy({
                scope: this,
                urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.LOG_DELETE, tmpLog.data.id),
                success: this.onDeleteCallback
            });
        }
    },
    onDeleteCallback:function(argResult){
        Ext.getStore('projects.Logs').removeAt(this.toDeleteIndex);
        this.onTotalTimeUpdate();
    }
});