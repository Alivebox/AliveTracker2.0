Ext.define('AliveTracker.view.projects.LogBookGridHeader', {

    extend: 'Ext.Container',
    xtype: 'logbookgridheader',
    layout: 'column',

    initComponent: function(){
        this.activityTextField = this.onCreateActivityTextField();
        this.timeTextField = this.onCreateTimeTextField();
        this.items = [
            {
                xtype: 'combobox',
                name: 'project',
                itemId: 'logProjectComboBox',
                allowBlank: false,
                fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                labelAlign: 'top',
                displayField: 'name',
                editable: false,
                queryMode: 'local'
            },
            this.activityTextField,
            this.timeTextField
        ];
        this.callParent(arguments);
    },

    /**Create a textfield for activity*/
    onCreateActivityTextField: function(){
        var tmpActivityTextField = Ext.create('Ext.form.field.Text',{
            name:'txtActivity',
            fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
            labelAlign: 'top',
            allowBlank:false,
            width: 500,
            maxLength:300
        });
        return tmpActivityTextField;
    },

    /**Create a textfield with numbers validation for time*/
    onCreateTimeTextField: function() {
        var tmpNumberTextField = Ext.create('Ext.form.field.Number',{
            width:50,
            allowNegative:false,
            allowBlank:false,
            fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
            labelAlign: 'top',
            value:1,
            name:'time',
            maxValue: 24,
            minValue: 1,
            editable: false
        });
        return tmpNumberTextField;
    },

    /**
     * Creates a comboBox which hold project store
     */
    onCreateProjectComboBox: function(){
        var tmpProjectComboBox = Ext.create('Ext.form.ComboBox', {
            name: 'project',
            itemId: 'logProjectComboBox',
            allowBlank: false,
            fieldLabel: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
            labelAlign: 'top',
            displayField: 'name',
            editable: false
        });
        return tmpProjectComboBox;
    }
});