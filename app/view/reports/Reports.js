Ext.define('AliveTracker.view.reports.Reports', {

    extend:'Ext.container.Container',
    xtype:'reportsform',
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype:'combobox',
                        itemId:'projectReports',
                        cls: 'report-form-align',
                        fieldCls: 'report-form',
                        emptyText: Locales.AliveTracker.REPORTS_LABEL_SELECT,
                        store: 'projects.Projects',
                        queryMode: 'local',
                        allowBlank:false,
                        fieldLabel: Locales.AliveTracker.REPORTS_LABEL_PROJECT,
                        labelCls: 'report-label',
                        displayField:'name',
                        valueField: 'id',
                        editable:false,
                        width: 400,
                        listeners:{
                            scope:this,
                            select:this.onLoadUsersStore
                        }
                    },
                    {
                        xtype:'combobox',
                        itemId:'userReports',
                        cls: 'report-form-align',
                        fieldCls: 'report-form',
                        emptyText: Locales.AliveTracker.REPORTS_LABEL_SELECT,
                        allowBlank:false,
                        fieldLabel: Locales.AliveTracker.REPORTS_LABEL_USER,
                        labelCls: 'report-label',
                        store:'users.Users',
                        queryMode: 'local',
                        displayField:'email',
                        valueField: 'id',
                        editable:false,
                        width: 400
                    },
                    {
                        xtype:'combobox',
                        itemId:'dateRangeComboReports',
                        fieldCls: 'report-form',
                        name:'dateRangeComboReports',
                        allowBlank:false,
                        fieldLabel:Locales.AliveTracker.REPORTS_LABEL_DATERANGE,
                        labelCls: 'report-label',
                        editable:false,
                        store:[
                            [AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_CUSTOM_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_DAY_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_DAY_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_SEVEN_DAYS_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_SEVEN_DAYS_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_TWO_WEEKS_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_TWO_WEEKS_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_MONTH_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_MONTH_DATERANGE_DESCRIPTION]
                        ],
                        listeners:{
                            scope:this,
                            change:this.onDateRangeComboChanged
                        }
                    },
                    {
                        xtype:'daterange',
                        itemId:'dateRangeReports',
                        name:'dateRangeReports',
                        allowBlank:true,
                        hidden:true
                    }
                ]
            },
            {
                xtype:'button',
                text:Locales.AliveTracker.REPORTS_LABEL_PREVIEW,
                listeners:{
                    scope:this,
                    click:this.onShowPreview
                }
            },
            {
                xtype:'button',
                text:Locales.AliveTracker.REPORTS_LABEL_EXPORT,
                formBind:true,
                listeners:{
                    scope:this,
                    click:this.onExportReportClick
                }

            },
            {
                xtype: 'gridpanel',
                itemId: 'gridReports',
                hidden: true,
                store: 'reports.Reports',
                columns: [
                    {
                        header: 'Project',
                        dataIndex: 'project_name'
                    },
                    {
                        header: 'Activity',
                        dataIndex: 'activity'
                    },
                    {
                        header: 'Time',
                        dataIndex: 'time'
                    },
                    {
                        header: 'Date',
                        dataIndex: 'date'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onExportReportClick:function () {
        this.fireEvent('exportReport');
    },
    onDateRangeComboChanged:function () {
        this.fireEvent('dateRangeComboSelection');
    },
    onLoadUsersStore:function () {
        this.fireEvent('loadUsersStore');
    },
    onShowPreview:function () {
        this.fireEvent('showPreview');
    }

});