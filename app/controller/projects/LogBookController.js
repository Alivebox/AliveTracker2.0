Ext.define("AliveTracker.controller.projects.LogBookController", {

    extend:"Ext.app.Controller",

    views:[
        'projects.LogBook',
        'projects.LogBookActivityForm',
        'projects.LogBookGrid',
        'projects.AddNotesPopUp'
    ],

    models:[
        'projects.Project',
        'projects.LogBook',
        'projects.Log',
        'projects.Note',
        'projects.Status'
    ],

    stores:[
        'projects.Projects',
        'projects.Logs',
        'projects.Notes',
        'projects.ActivityNotes'
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
        },
        {
            ref: 'noteform',
            selector: 'addnotespopup [itemId=noteForm]'
        },
        {
            ref: 'addNoteButton',
            selector: 'addnotespopup [itemId=btnAddNote]'
        },
        {
            ref: 'editNoteButton',
            selector: 'addnotespopup [itemId=btnEditNote]'
        },
        {
            ref: 'noteText',
            selector: 'addnotespopup [itemId=noteTextArea]'
        }
    ],

    currentActivity: null,
    currentNote: null,

    init:function () {
        this.control({
            'logbook':{
                afterrender: this.onLogAfterRender,
                datePickerChanged:this.reloadLogStore,
                sendStatusClick: this.sendStatusToAdmins
            },
            'logbookactivityform': {
                addActivity:this.onAddNewActivity,
                comboProjectSelected: this.enableActivityField,
                numberFieldFocus: this.onNumberFieldFocus
            },
            'logbookgrid':{
                deleteLog: this.onShowDeleteConfirm,
                editCell: this.editActivity,
                notesIconClick: this.showAddNotesPopUp,
                sortColumn: this.changeColumnBackground
            },
            'addnotespopup':{
                beforerender: this.loadNotesStore,
                closeClick: this.closeWindow,
                saveNotes: this.onSaveNotes,
                addNote: this.onAddNote,
                editNote: this.onEditNote,
                deleteNote: this.showDeleteNoteConfirm,
                selectRow: this.loadNoteData,
                itemOver: this.showDeleteIcon,
                itemBlur: this.hideDeleteIcon
            }
        });
    },

    onLogAfterRender: function (){
        var tmpMonthButton = this.getDatepicker().monthBtn;;
        tmpMonthButton.setTooltip('');
        tmpMonthButton.suspendEvents(true);
    },

    onTotalTimeUpdate:function () {
        var tmpTotal = 0;
        var tmpStore = Ext.getStore('projects.Logs');
        tmpStore.each(function (record) {
            tmpTotal += record.data.time;
        }, this);
        this.getTotalTime().setValue(tmpTotal);
    },

    enableActivityField:function () {
        var tmpActivityTextField = this.getLogsform().down('textfield[itemId=txtActivity]');
        tmpActivityTextField.setDisabled(false);
    },

    onNumberFieldFocus: function(){
        var tmpTimeNumberField = this.getLogsform().down('numberfield[itemId=time]');
        tmpTimeNumberField.selectText();
    },

    onAddNewActivity:function () {
        var tmpActivity = this.createActivityInstance();
        var tmpActivityField = this.getLogsform().down('textfield[itemId=txtActivity]');
        var tmpLogsStore = Ext.getStore('projects.Logs');
        var tmpUrl = AliveTracker.defaults.WebServices.SAVE_LOG;
        if(!this.getLogsform().isValid() || !this.isTimeValid() || !this.isFieldValid(tmpActivityField)){
            return;
        }
        tmpActivity.set("group", Ext.state.Manager.get('groupId'));
        tmpLogsStore.add(tmpActivity);
        this.onClearUsersSelection();
        this.onTotalTimeUpdate();
        tmpActivity.save({
            urlOverride:tmpUrl
        });
    },

    createActivityInstance: function(){
        var tmpProjectCombobox = this.getLogsform().down('combobox[itemId=logProjectComboBox]');
        var tmpActivityTextField = this.getLogsform().down('textfield[itemId=txtActivity]');
        var tmpTimeNumberField = this.getLogsform().down('numberfield[itemId=time]');
        var tmpActivity = Ext.create('AliveTracker.model.projects.Log',{
            group: Ext.state.Manager.get('groupId'),
            project: tmpProjectCombobox.getValue(),
            project_name: tmpProjectCombobox.getRawValue(),
            date:this.getDatepicker().getValue(),
            activity: tmpActivityTextField.getValue(),
            time: tmpTimeNumberField.getValue()
        });
        return tmpActivity;
    },

    getLogBook:function () {
        var tmpLogArray = [];
        tmpLogArray = this.getItemsFromStore(Ext.getStore('projects.Logs'));
        var tmpLogBook = Ext.create('AliveTracker.model.projects.Status', {
            date:this.getDatepicker().getValue(),
        });
        return tmpLogBook;
    },

    isTimeValid: function(){
        var tmpTime = this.getLogsform().down('numberfield[itemId=time]').getValue();
        var tmpBeforeTotal = this.getTotalTime().getValue();
        var tmpAfterTotal = tmpTime+tmpBeforeTotal;
        if(tmpTime > 24 || tmpTime < 1 || tmpAfterTotal > 24){
            return false;
        }
        return true;
    },

    isFieldValid: function(argField){
        if(Ext.util.Format.trim(argField.value).length > 0){
            return true;
        }
        return false;
    },

    onClearUsersSelection:function () {
        var tmpActivityField = this.getLogsform().down('textfield[itemId=txtActivity]');
        tmpActivityField.setValue('');
        this.getLogsform().down('numberfield[itemId=time]').setValue(1);
        tmpActivityField.focus();
    },

    sendStatusToAdmins: function() {
        var tmpDateSelected = this.getDatepicker().getValue();
        var tmpLogBook = this.getLogBook();
        tmpLogBook.set('email', Mercury.core.SecurityManager.getCurrentUsername());
        tmpLogBook.save();
    },

    sendStatusSucces: function(argRecord){
        Ext.Msg.alert(Locales.AliveTracker.SUCCESS_MESSAGE, Locales.AliveTracker.SUCCESS_SEND_EMAIL_INSTRUCTION);
    },

    reloadLogStore: function (){
        Ext.getStore('projects.Logs').removeAll();
        var tmpSelectDate = Ext.Object.toQueryString({date: this.getDatepicker().getValue('Y-m-d')});
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOGS_USER_GROUP_DATE, Ext.state.Manager.get('groupId'), tmpSelectDate);
        this.populateLogsStore(tmpUrl, this.onTotalTimeUpdate);
    },

    populateLogsStore:function (argUrl, argCallback){
        var tmpLogsStore = Ext.getStore('projects.Logs');
        tmpLogsStore.load({
            scope: this,
            urlOverride: argUrl,
            callback: argCallback
        });
    },

    getItemsFromStore:function (argStore){
        var tmpArray = [];
        for(var i=0; i < argStore.data.items.length; i++){
            tmpArray.push(argStore.data.items[i].data)
        }
        return tmpArray;
    },

    editActivity: function(argRecord){
        var tmpLogId = argRecord.record.data.id;
        var tmpActivity = argRecord.record.data.activity;
        var tmpTime = argRecord.record.data.time;
        var tmpProjectName = argRecord.record.data.project_name;
        var tmpProject = this.getProjectIdByName(tmpProjectName);
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_LOG,tmpLogId);
        var tmpLog = Ext.create('AliveTracker.model.projects.Log', {
            id: tmpLogId,
            project: tmpProject,
            activity: tmpActivity,
            time: tmpTime
        });
        this.onTotalTimeUpdate();
        tmpLog.save({
            urlOverride:tmpUrl
        });
    },

    getProjectIdByName: function(argName){
        var tmpProjectsStore = Ext.getStore('projects.Projects');
        for(var tmpIndex=0; tmpIndex < tmpProjectsStore.getCount(); tmpIndex++){
            var tmpProject = tmpProjectsStore.getAt(tmpIndex);
            if(tmpProject.get('name')==argName){
                return tmpProject.get('id');
            }
        }
    },

    changeColumnBackground: function(argColumn){
        argColumn.removeCls('logbook-grid-column');
        argColumn.addCls('logbook-grid-sort-column');
    },

    showAddNotesPopUp: function(argRecord){
        var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
        tmpActivityNotesStore.removeAll();
        this.currentActivity = argRecord;
        var tmpAddNotePopUp = Ext.create('AliveTracker.view.projects.AddNotesPopUp');
        tmpAddNotePopUp.show();
    },

    loadNotesStore: function(){
        var tmpNotesStore = Ext.getStore('projects.Notes');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.GET_LOG_NOTES,this.currentActivity.data.id);
        tmpNotesStore.load({
            scope: this,
            urlOverride:  tmpUrl,
            callback: this.loadActivityNotesStore
        });
    },

    loadActivityNotesStore: function(){
        var tmpNotesStore = Ext.getStore('projects.Notes');
        var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
        tmpActivityNotesStore.removeAll();
        for (var tmpIndex = 0; tmpIndex < tmpNotesStore.getCount(); tmpIndex++){
            var tmpNote = tmpNotesStore.getAt(tmpIndex);
            if(tmpNote.get('log') == this.currentActivity.data.id){
                tmpActivityNotesStore.add(tmpNote);
            }
        }
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
    },

    onSaveNotes: function(argWindow){
        var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
        var tmpNotesStore = Ext.getStore('projects.Notes');
        var tmpUrl = Ext.util.Format.format(AliveTracker.defaults.WebServices.UPDATE_LOG,this.currentActivity.data.id);
        var tmpNotesArray = [];
        for (var tmpIndex = 0; tmpIndex < tmpActivityNotesStore.getCount(); tmpIndex++){
            var tmpNote = tmpActivityNotesStore.getAt(tmpIndex);
            tmpNotesStore.add(tmpNote);
        }
        tmpNotesArray = this.getNotesFromStore(Ext.getStore('projects.Notes'));
        this.currentActivity.set('notes',tmpNotesArray);
        argWindow.close();
        this.currentActivity.save({
            urlOverride: tmpUrl
        });
    },

    getNotesFromStore:function (argStore){
        var tmpArray = [];
        for(var tmpIndex=0; tmpIndex < argStore.getCount(); tmpIndex++){
            var tmpNote = argStore.getAt(tmpIndex);
            if(tmpNote.get('log') == this.currentActivity.data.id){
                tmpArray.push(tmpNote.data);
            }
        }
        return tmpArray;
    },

    onAddNote: function(){
        var tmpNote = this.createNoteInstance();
        var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
        var tmpIndex=tmpActivityNotesStore.getCount()-1
        for(tmpIndex; tmpIndex >= 0; tmpIndex--){
            var tmpNoteElement = tmpActivityNotesStore.getAt(tmpIndex);
            if(tmpNoteElement.get('note') != ""){
                break;
            }
        }
        tmpActivityNotesStore.removeAt(tmpIndex+1);
        tmpActivityNotesStore.insert(tmpIndex+1,tmpNote);
        this.getNoteText().setValue("");
        this.getNoteText().focus();
    },

    createNoteInstance: function(){
        var tmpForm = this.getNoteform();
        var tmpNote = Ext.create('AliveTracker.model.projects.Note',{
            note: tmpForm.getRecord().data.note,
            log: this.currentActivity.data.id
        });
        return tmpNote;
    },

    onEditNote: function(){
        var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
        var tmpTextNote = this.getNoteText().value;
        this.currentNote.set('note',tmpTextNote);
        if(this.currentNote.data.id != 0){
            this.currentNote.set('action',1);
        }
        tmpActivityNotesStore.commitChanges();
        this.changeButtonsVisibility(false);
        this.getNoteText().setValue("");
        this.getNoteText().focus();
    },

    showDeleteNoteConfirm: function(argIndex){
        this.deleteNoteIndex = argIndex;
        Ext.MessageBox.confirm('Confirm', Ext.util.Format.format( Locales.AliveTracker.GRID_DELETE_ROW_CONFIRMATION_MESSAGE),this.onDeleteNote, this);
    },

    onDeleteNote: function(argButton){
        if(argButton == 'yes'){
            var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
            var tmpNote = tmpActivityNotesStore.getAt(this.deleteNoteIndex);
            tmpNote.destroy({
                scope: this,
                urlOverride: Ext.util.Format.format(AliveTracker.defaults.WebServices.NOTE_DELETE, tmpNote.data.id),
                success: this.deleteNoteCallback(this.deleteNoteIndex)
            });
        }
    },

    deleteNoteCallback:function(argIndex){
        var tmpActivityNotesStore = Ext.getStore('projects.ActivityNotes');
        tmpActivityNotesStore.removeAt(argIndex);
    },

    loadNoteData: function(argRecord){
        if(argRecord.data.note.length > 0){
            this.currentNote = argRecord;
            this.changeButtonsVisibility(true);
            this.getNoteText().setValue(argRecord.data.note);
            return;
        }
        this.changeButtonsVisibility(false);
        this.getNoteText().setValue("");
    },

    changeButtonsVisibility: function(argEdit){
        if(argEdit){
            this.getAddNoteButton().setVisible(false);
            this.getEditNoteButton().setVisible(true);
            return;
        }
        this.getEditNoteButton().setVisible(false);
        this.getAddNoteButton().setVisible(true);
    },

    showDeleteIcon: function(argItem){
        var tmpIcon = Ext.select('#' + Ext.get(argItem).id +' [src~="resources/images/delete_dis.png"]');
        tmpIcon.removeCls('x-hide-display');
        tmpIcon.addCls('x-grid-center-icon');
    },

    hideDeleteIcon: function(argItem){
        var tmpIcon = Ext.select('#' + Ext.get(argItem).id +' [src~="resources/images/delete_dis.png"]');
        tmpIcon.removeCls('x-grid-center-icon');
        tmpIcon.addCls('x-hide-display');
    },

    closeWindow: function(argWindow){
        argWindow.close();
    }
});