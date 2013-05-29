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
                        columnWidth:.60,
                        cls: 'logbook-label'
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
                        cls: 'logbook-time-label',
                        columnWidth:.20
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
                        queryMode:'local'
                    },
                    {
                        xtype: 'textfield',
                        itemId:'txtActivity',
                        name: 'activity',
                        fieldCls: 'logbook-view-form',
                        cls: 'logbook-form-align',
                        columnWidth:.60,
                        maxLength:300
                    },
                    {
                        xtype: 'numberfield',
                        name: 'time',
                        columnWidth:.20,
                        fieldCls: 'logbook-view-form',
                        allowNegative:false,
                        itemId: 'time',
                        maxValue: 24,
                        minValue: 0,
                        hideTrigger: true,
                        listeners:{
                            scope:this,
                            specialkey:this.onEnterKeyPressed
                        }
                    },
                    {
                        xtype: 'button',
                        name: 'include',
                        cls: 'all-views-button logbook-add-button',
                        maxWidth: 30,
                        minWidth: 30,
                        tooltip: Locales.AliveTracker.ACTIVITY_ADD_BUTTON,
                        icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
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
    }
});