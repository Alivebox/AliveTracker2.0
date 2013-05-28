Ext.define('AliveTracker.view.projects.LogBookActivityForm', {

    extend: 'Ext.container.Container',
    xtype: 'logbookactivityform',

    initComponent: function(){
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_PROJECT,
                        width: '31.5%',
                        cls: 'logbook-label'
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_ACTIVITY,
                        width: '61%',
                        cls: 'logbook-label'
                    },
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.PROJECTS_COLUMN_HEADER_TIME,
                        cls: 'logbook-time-label',
                        width: '8%'
                    }
                ]
            },
            {
                xtype: 'formcontainer',
                itemId: 'logFormContainer',
                modelClassName: 'AliveTracker.model.projects.Log',
                cls: 'logbook-fields-container',
                layout: 'hbox',
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
                        width: '32%',
                        queryMode:'local'
                    },
                    {
                        xtype: 'textfield',
                        itemId:'txtActivity',
                        name: 'activity',
                        fieldCls: 'logbook-view-form',
                        cls: 'logbook-form-align',
                        width: '61.5%',
                        maxLength:300
                    },
                    {
                        xtype: 'numberfield',
                        name: 'time',
                        width:'4%',
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