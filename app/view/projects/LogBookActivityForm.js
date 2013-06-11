Ext.define('AliveTracker.view.projects.LogBookActivityForm', {

    extend: 'Ext.container.Container',
    xtype: 'logbookactivityform',

    initComponent: function(){
        this.items = [
            {
                xtype: 'container',
                cls: 'logbook-activity-form-labels-container',
                layout: 'column',
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                        columnWidth:.20,
                        cls: 'logbook-label'
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
                        columnWidth:.74,
                        cls: 'logbook-label'
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
                        cls: 'logbook-time-label',
                        columnWidth:.05
                    },
                    {
                        xtype: 'label',
                        maxWidth: 30,
                        minWidth: 30
                    }
                ]
            },
            {
                xtype: 'formcontainer',
                itemId: 'logFormContainer',
                modelClassName: 'AliveTracker.model.projects.Log',
                cls: 'logbook-fields-container',
                layout: 'column',
                items: [
                    {
                        xtype: 'combobox',
                        name: 'project',
                        itemId: 'logProjectComboBox',
                        fieldCls: 'logbook-view-project-form',
                        cls: 'logbook-form-align',
                        emptyText: Locales.AliveTracker.PROJECTS_LABEL_SELECT,
                        displayField: 'name',
                        valueField: 'id',
                        store: 'projects.Projects',
                        editable: false,
                        columnWidth:.20,
                        queryMode:'local',
                        listeners:{
                            scope:this,
                            select:this.onComboItemSelected
                        }
                    },
                    {
                        xtype: 'textfield',
                        itemId:'txtActivity',
                        name: 'activity',
                        disabled: true,
                        fieldCls: 'logbook-view-form',
                        cls: 'logbook-form-align',
                        columnWidth:.75,
                        regex: /[a-zA-Z0-9]+/,
                        maxLength:300,
                        listeners:{
                            scope:this,
                            specialkey:this.onEnterKeyPressed
                        }
                    },
                    {
                        xtype: 'numberfield',
                        columnWidth:.05,
                        fieldCls: 'logbook-view-form',
                        allowNegative:false,
                        decimalSeparator: '.',
                        enforceMaxLength: true,
                        maxLength: 5,
                        itemId: 'time',
                        allowBlank: false,
                        value: 1,
                        maxValue: 24,
                        minValue: 1,
                        hideTrigger: true,
                        listeners:{
                            scope:this,
                            specialkey:this.onEnterKeyPressed,
                            focus: this.onNumberFocus
                        }
                    },
                    {
                        xtype: 'button',
                        cls: 'all-views-button logbook-add-button',
                        maxWidth: 30,
                        minWidth: 30,
                        tooltip: Locales.AliveTracker.ACTIVITY_ADD_BUTTON,
                        icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
                        iconAlign: 'center',
                        listeners: {
                            scope: this,
                            click: this.onAddActivityClick
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onAddActivityClick:function() {
        this.fireEvent('addActivity');
    },

    onEnterKeyPressed:function (field, e) {
        if(e.getKey() == e.ENTER){
            this.fireEvent('addActivity');
        }
    },

    onComboItemSelected: function(){
        this.fireEvent('comboProjectSelected');
    },

    onNumberFocus: function(){
        this.fireEvent('numberFieldFocus');
    }

});