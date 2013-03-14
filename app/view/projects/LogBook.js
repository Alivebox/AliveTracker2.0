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
                        xtype:'datepickerfield',
                        name:'date',
                        itemId:'datepickerLogBook',
                        allowBlank:false,
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
                                store:'Logs'
                            },
                            {
                                xtype:'label',
                                itemId:'totalTime',
                                text:Locales.AliveTracker.PROJECTS_LABEL_TOTAL
                            },
                            {
                                xtype:'button',
                                itemId:'saveLogHistory',
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
        this.fireEvent('datePickerChanged', this.getComponent(1).getComponent('datepickerLogBook'));
    }

});