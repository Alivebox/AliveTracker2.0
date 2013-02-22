Ext.define('AliveTracker.view.projects.LogBookForm', {

    extend: 'Ext.form.Panel',
    xtype: 'logbookform',

    initComponent:function () {
        this.items = [
            {
                xtype: 'label',
                name: 'logBook',
                text: Locales.AliveTracker.PROJECTS_LABEL_LOG_BOOK
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
                                text: Locales.AliveTracker.PROJECTS_LABEL_TOTAL
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