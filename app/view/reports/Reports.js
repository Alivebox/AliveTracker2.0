Ext.define('AliveTracker.view.reports.Reports', {

    extend:'Ext.container.Container',
    xtype:'reportsform',
    cls: 'main-containers',

    initComponent:function () {
        this.items = [
            {
                xtype: 'formcontainer',
                modelClassName: 'AliveTracker.model.reports.ReportForm',
                layout: 'hbox',
                itemId: 'reportFormContainer',
                items: [
                    {
                        xtype: 'label',
                        cls: 'report-label',
                        text: Locales.AliveTracker.REPORTS_LABEL_PROJECT
                    },
                    {
                        xtype:'combobox',
                        itemId:'projectReports',
                        name: 'project',
                        cls: 'report-form-align',
                        fieldCls: 'report-form',
                        emptyText: Locales.AliveTracker.REPORTS_LABEL_SELECT,
                        store: 'projects.Projects',
                        queryMode: 'local',
                        displayField:'name',
                        valueField: 'id',
                        editable:false,
                        width: 400,
                        listeners:{
                            scope:this,
                            select:this.onGroupSelected
                        }
                    },
                    {
                        xtype: 'label',
                        cls: 'report-label',
                        text: Locales.AliveTracker.REPORTS_LABEL_USER
                    },
                    {
                        xtype:'combobox',
                        itemId:'userReports',
                        name: 'user',
                        cls: 'report-form-align',
                        fieldCls: 'report-form',
                        emptyText: Locales.AliveTracker.REPORTS_LABEL_SELECT,
                        store:'users.Users',
                        queryMode: 'local',
                        displayField:'email',
                        valueField: 'id',
                        editable:false,
                        width: 400
                    },
                    {
                        xtype: 'label',
                        cls: 'report-label',
                        text: Locales.AliveTracker.REPORTS_LABEL_DATERANGE
                    },
                    {
                        xtype:'combobox',
                        itemId:'dateRangeComboReports',
                        cls: 'report-form-date',
                        fieldCls: 'report-form',
                        name:'dateRangeComboReports',
                        allowBlank:false,
                        editable:false,
                        width: 300,
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
                        cls: 'report-daterange',
                        itemId:'dateRangeReports',
                        name:'dateRangeReports',
                        allowBlank:true,
                        hidden:true
                    },
                    {
                        xtype:'button',
                        cls: 'all-views-button report-button-align',
                        text:Locales.AliveTracker.REPORTS_LABEL_PREVIEW,
                        listeners:{
                            scope:this,
                            click:this.onShowPreview
                        }
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                itemId: 'gridReports',
                cls: 'report-grid-container',
                height: 400,
                store: 'reports.Reports',
                columns: [
                    {
                        header: 'Project',
                        menuDisabled:true,
                        sortable: false,
                        cls: 'report-grid-column',
                        dataIndex: 'project_name',
                        flex: 1
                    },
                    {
                        header: 'Activity',
                        menuDisabled:true,
                        cls: 'report-grid-activity-column',
                        dataIndex: 'activity',
                        flex: 3
                    },
                    {
                        header: 'Date',
                        menuDisabled:true,
                        sortable: false,
                        cls: 'report-grid-column',
                        dataIndex: 'date',
                        flex: 1
                    }
                ]
            },
            {
                xtype:'button',
                cls: 'all-views-button report-button-align',
                text:Locales.AliveTracker.REPORTS_LABEL_EXPORT,
                formBind:true,
                listeners:{
                    scope:this,
                    click:this.onExportReportClick
                }

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
    onGroupSelected:function () {
        this.fireEvent('groupSelected');
    },
    onShowPreview:function () {
        this.fireEvent('showPreview');
    }

});