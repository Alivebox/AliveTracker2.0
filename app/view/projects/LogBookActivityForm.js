Ext.define('AliveTracker.view.projects.LogBookActivityForm', {

    extend: 'Ext.container.Container',
    xtype: 'logbookactivityform',
    layout: 'column',

    initComponent: function(){
        this.projectCombobox = this.createProjectComboBox();
        this.activityTextField = this.createActivityTextField();
        this.timeTextField = this.createTimeTextField();
        this.addActivityButton = this.createAddActivityButton();
        this.items = [
            this.projectCombobox,
            this.activityTextField,
            this.timeTextField,
            this.addActivityButton
        ];
        this.callParent(arguments);
    },

    createProjectComboBox: function(){
        var tmpProjectComboBox = {
            xtype: 'combobox',
            itemId: 'logProjectComboBox',
            allowBlank: false,
            fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
            labelAlign: 'top',
            displayField: 'name',
            valueField: 'id',
            store: 'Projects',
            editable: false,
            queryMode:'local'
        };
        return tmpProjectComboBox;
    },

    createActivityTextField: function(){
        var tmpActivityTextField = {
            xtype: 'textfield',
            itemId:'txtActivity',
            fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
            labelAlign: 'top',
            allowBlank:false,
            width: 500,
            maxLength:300
        };
        return tmpActivityTextField;
    },

    createTimeTextField: function() {
        var tmpNumberTextField = {
            xtype: 'numberfield',
            width:50,
            allowNegative:false,
            allowBlank:false,
            fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
            labelAlign: 'top',
            value:1,
            itemId:'time',
            maxValue: 24,
            minValue: 1,
            editable: false
        };
        return tmpNumberTextField;
    },

    createAddActivityButton: function(){
        var tmpAddActivityButton = {
            xtype: 'button',
            name: 'include',
            text: null,
            icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
            listeners: {
                scope: this,
                click: this.onAddNewActivity
            }
        };
        return tmpAddActivityButton;
    },

    onAddNewActivity:function() {
        var tmpActivity = this.getValue();
        this.fireEvent('addActivity', tmpActivity);
    },

    getValue: function(){
        if( !this.isValid() ){
            return null;
        }
        var tmpActivity = this.createActivityInstance();
        return tmpActivity;
    },

    createActivityInstance: function(){
        var tmpProjectCombobox = this.down('combobox[itemId=logProjectComboBox]');
        var tmpActivityTextField = this.down('textfield[itemId=txtActivity]');
        var tmpTimeNumberField = this.down('numberfield[itemId=time]');
        var tmpActivity = Ext.create('AliveTracker.model.projects.Log',{
            project: tmpProjectCombobox.getValue(),
            project_name: tmpProjectCombobox.getRawValue(),
            activity: tmpActivityTextField.getValue(),
            time: tmpTimeNumberField.getValue()
        });
        return tmpActivity;
    },

    isValid: function(){
        var tmpProjectCombobox = this.down('combobox[itemId=logProjectComboBox]');
        var tmpActivityTextField = this.down('textfield[itemId=txtActivity]');
        var tmpTimeNumberField = this.down('numberfield[itemId=time]');
        if( !tmpProjectCombobox.isValid() || !tmpActivityTextField.isValid() ){
            return false;
        }
        return true;
    }
});