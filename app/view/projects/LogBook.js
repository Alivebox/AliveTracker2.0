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
                                xtype:'textfield',
                                itemId:'totalTime',
                                fieldLabel: Locales.AliveTracker.PROJECTS_LABEL_TOTAL,
                                cls: 'logbook-view-form-align',
                                fieldCls: 'logbook-view-form',
                                readOnly: true,
                                width:'50px'
                            },
                            {
                                xtype:'button',
                                itemId:'saveLogHistory',
                                cls: 'all-views-button',
                                text:Locales.AliveTracker.PROJECTS_LABEL_SAVE,
                                listeners:{
                                    scope:this,
                                    click:this.onSaveAll
                                }
                            }
                        ]
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