Ext.define('AliveTracker.view.projects.LogBookActivityForm', {

    extend: 'Ext.container.Container',
    xtype: 'logbookactivityform',

    initComponent: function(){
        this.projectCombobox = this.createProjectComboBox();
        this.activityTextField = this.createActivityTextField();
        this.timeTextField = this.createTimeTextField();
        this.addActivityButton = this.createAddActivityButton();
        this.items = [
            {
                xtype: 'container',
                cls: 'logbook-label-container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                        cls: 'logbook-label'
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
                        cls: 'logbook-label'
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'logbook-fields-container',
                layout: 'hbox',
                items: [
                    this.projectCombobox,
                    this.activityTextField,
                    this.timeTextField,
                    this.addActivityButton
                ]
            }
        ];
        this.callParent(arguments);
    },

    createProjectComboBox: function(){
        var tmpProjectComboBox = {
            xtype: 'combobox',
            itemId: 'logProjectComboBox',
            fieldCls: 'logbook-view-project-form',
            cls: 'logbook-form-align',
            allowBlank: false,
            displayField: 'name',
            valueField: 'id',
            store: 'projects.Projects',
            editable: false,
            width: '29.5%',
            queryMode:'local'
        };
        return tmpProjectComboBox;
    },

    createActivityTextField: function(){
        var tmpActivityTextField = {
            xtype: 'textfield',
            itemId:'txtActivity',
            fieldCls: 'logbook-view-form',
            cls: 'logbook-form-align',
            allowBlank:false,
            width: '65%',
            maxLength:300
        };
        return tmpActivityTextField;
    },

    createTimeTextField: function() {
        var tmpNumberTextField = {
            xtype: 'numberfield',
            width:50,
            fieldCls: 'logbook-view-form',
            cls: 'logbook-form-align',
            allowNegative:false,
            allowBlank:false,
            value:00,
            itemId:'time',
            maxValue: 24,
            minValue: 1,
            hideTrigger: true
        };
        return tmpNumberTextField;
    },

    createAddActivityButton: function(){
        var tmpAddActivityButton = {
            xtype: 'button',
            name: 'include',
            cls: 'all-views-button logbook-add-button',
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