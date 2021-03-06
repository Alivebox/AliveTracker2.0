Ext.define('AliveTracker.view.reports.Reports', {

    extend:'Ext.container.Container',
    xtype:'reportsform',
    initComponent:function () {
        this.items = [
            {
                xtype: 'formcontainer',
                modelClassName: 'AliveTracker.model.reports.ReportForm',
                layout: 'column',
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
                        width: 230,
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
                        disabled: true,
                        emptyText: Locales.AliveTracker.REPORTS_LABEL_SELECT,
                        store:'users.Users',
                        queryMode: 'local',
                        displayField:'email',
                        valueField: 'id',
                        width: 230,
                        editable:false,
                        listeners:{
                            scope: this,
                            select: this.onComboItemSelected
                        }
                    },
                    {
                        xtype: 'label',
                        cls: 'report-label',
                        text: Locales.AliveTracker.REPORTS_LABEL_DATERANGE
                    },
                    {
                        xtype:'combobox',
                        itemId:'dateRangeComboReports',
                        cls: 'report-form-align',
                        fieldCls: 'report-form',
                        emptyText: Locales.AliveTracker.REPORTS_LABEL_SELECT,
                        name:'dateRangeOption',
                        editable:false,
                        width: 230,
                        store:[
                            [AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_CUSTOM_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_DAY_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_DAY_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_SEVEN_DAYS_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_SEVEN_DAYS_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_TWO_WEEKS_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_TWO_WEEKS_DATERANGE_DESCRIPTION],
                            [AliveTracker.defaults.Constants.REPORTS_LAST_MONTH_DATERANGE_OPTION, Locales.AliveTracker.REPORTS_LAST_MONTH_DATERANGE_DESCRIPTION]
                        ],
                        listeners:{
                            scope: this,
                            select: this.onDateRangeComboChanged
                        }
                    },
                    {
                        xtype:'daterange',
                        cls: 'report-daterange',
                        itemId:'dateRangeReports',
                        name:'dateRangeReports',
                        hidden:true
                    },
                    {
                        xtype:'button',
                        itemId: 'btnPreview',
                        cls: 'all-views-button report-preview-button',
                        text:Locales.AliveTracker.REPORTS_LABEL_PREVIEW,
                        disabled: true,
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
                columnLines: true,
                height: 750,
                store: 'reports.Reports',
                columns: [
                    {
                        header: Locales.AliveTracker.REPORTS_LABEL_PROJECT,
                        menuDisabled:true,
                        cls: 'report-grid-column',
                        dataIndex: 'project_name',
                        listeners:{
                            scope: this,
                            headerclick: this.onSortColumn
                        },
                        flex: 1
                    },
                    {
                        header: Locales.AliveTracker.REPORTS_LABEL_USER,
                        menuDisabled:true,
                        cls: 'report-grid-column',
                        dataIndex: 'user_name',
                        listeners:{
                            scope: this,
                            headerclick: this.onSortColumn
                        },
                        flex: 1
                    },
                    {
                        header: Locales.AliveTracker.REPORTS_LABEL_ACTIVITY,
                        menuDisabled:true,
                        cls: 'report-grid-column',
                        dataIndex: 'activity',
                        listeners:{
                            scope: this,
                            headerclick: this.onSortColumn
                        },
                        flex: 3
                    },
                    {
                        header: Locales.AliveTracker.REPORTS_LABEL_DATE,
                        menuDisabled:true,
                        cls: 'report-grid-column',
                        dataIndex: 'date',
                        listeners:{
                            scope: this,
                            headerclick: this.onSortColumn
                        },
                        flex: 1
                    }
                ]
            },
            {
                xtype:'button',
                itemId: 'btnExport',
                cls: 'all-views-button report-button-align',
                text:Locales.AliveTracker.REPORTS_LABEL_EXPORT,
                disabled: true,
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
        this.fireEvent('comboItemSelected');
    },
    onGroupSelected:function () {
        this.fireEvent('groupSelected');
    },
    onComboItemSelected:function () {
        this.fireEvent('comboItemSelected');
    },
    onShowPreview:function () {
        this.fireEvent('showPreview');
    },
    onSortColumn: function(argCt, argColumn){
        this.fireEvent('sortColumn',argColumn);
    }

});