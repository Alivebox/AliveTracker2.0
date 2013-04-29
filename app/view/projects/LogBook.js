Ext.define('AliveTracker.view.projects.LogBook', {

    extend:'Ext.container.Container',
    xtype:'logbook',

    initComponent:function () {
        this.items = [
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'datepicker',
                        name:'date',
                        itemId:'datepickerLogBook',
                        width: '315px',
                        minHeight: '300px',
                        allowBlank:false,
                        showToday: false,
                        startDay: 0,
                        disableAnim: true,
                        format:'Y-m-d',
                        listeners:{
                            scope:this,
                            select:this.onDateSelectedAction
                        }
                    },
                    {
                        xtype:'container',
                        cls: 'logbook-container',
                        items:[
                            {
                                xtype:'logbookactivityform',
                                model: 'AliveTracker.model.projects.Log'
                            },
                            {
                                xtype:'logbookgrid',
                                itemId:'logbookgrid',
                                store:'projects.Logs'
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                cls: 'logbook-total-container',
                                items: [
                                    {
                                        xtype: 'label',
                                        text: Locales.AliveTracker.PROJECTS_LABEL_TOTAL,
                                        cls: 'logbook-total-label'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId:'totalTime',
                                        cls: 'logbook-view-form-align',
                                        fieldCls: 'logbook-view-form',
                                        editable: false,
                                        hideTrigger: true,
                                        width:50
                                    }
                                ]
                            }
                        ]
                    }

                ]
            },
            {
                xtype:'container',
                cls: 'logbook-save-container',
                items:[
                    {
                        xtype:'button',
                        itemId:'saveLogHistory',
                        cls: 'all-views-button logbook-button',
                        text:Locales.AliveTracker.PROJECTS_LABEL_SAVE,
                        listeners:{
                            scope:this,
                            click:this.onSaveAll
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onSaveAll:function () {
        this.fireEvent('saveLogHistory', this);
    },
    onDateSelectedAction:function () {
        this.fireEvent('datePickerChanged', this);
    }

});