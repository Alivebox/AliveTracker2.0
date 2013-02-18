Ext.define('AliveTracker.view.projects.LogBookForm', {

    extend: 'Ext.form.Panel',
    xtype: 'logbookform',
    requires : [
        'AliveTracker.view.projects.LogBookGridHeader',
        'AliveTracker.view.projects.LogBookGrid',
        'AliveTracker.view.utils.DatePickerField'
    ],
    models:[
        'Group',
        'Project'
    ],

    stores:[
        'Groups',
        'Projects'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                name: 'logBook',
                text: 'Log Book'
            },
            {
                xtype: 'container',
                layout: 'column',
                items: [
                    {
                        xtype: 'datepickerfield',
                        name: 'datepicker',
                        itemId: 'datepickerLogBook',
                        allowBlank: false,
                        listeners:{
                            scope: this,
                            select: this.onDateSelectedAction
                        }
                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'container',
                                layout: 'column',
                                items: [
                                    {
                                        xtype: 'logbookgridheader'
                                    },
                                    {
                                        xtype: 'button',
                                        name: 'include',
                                        text: null,
                                        icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
                                        formBind: true,
                                        listeners: {
                                            scope: this,
                                            click: this.onAddNewActivity
                                        }
                                    }
                                ]
                            }            ,
                            {
                                xtype: 'logbookgrid',
                                itemId: 'logbookgrid',
                                store: 'LogBook'
                            },
                            {
                                xtype: 'label',
                                itemId: 'totalTime',
                                name: 'totalTime',
                                text: 'Total'
                            }
                        ]
                    }

                ]
            }
        ];
        this.callParent(arguments);
    },

    /**
     * Fires the newActivity event on the controller
     */
    onAddNewActivity:function () {
        this.fireEvent('newActivity', this);
    },

    /**
     * Fires the datePickerChanged event on the controller
     */
    onDateSelectedAction: function()
    {
        this.fireEvent('datePickerChanged', this.getComponent(1).getComponent('datepickerLogBook'));
    }

});