Ext.define('AliveTracker.view.projects.LogBook', {

    extend:'Ext.container.Container',
    xtype:'logbook',
    cls: 'tab-container-child',

    initComponent:function () {
        this.items = [
            {
                xtype:'container',
                items:[
                    {
                        xtype:'datepicker',
                        cls: 'logbook-datepicker',
                        name:'date',
                        itemId:'datepickerLogBook',
                        width: '19.3%',
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
                                model: 'AliveTracker.model.projects.Log',
                                cls: 'logboog-activity-form-container'
                            },
                            {
                                xtype:'logbookgrid',
                                itemId:'logbookgrid',
                                store:'projects.Logs'
                            },
                            {
                                xtype: 'container',
                                layout: 'column',
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
                                        fieldCls: 'logbook-view-form',
                                        emptyText: '0',
                                        width: 50,
                                        editable: false,
                                        hideTrigger: true
                                    }
                                ]
                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    },

    onDateSelectedAction:function () {
        this.fireEvent('datePickerChanged', this);
    }

});