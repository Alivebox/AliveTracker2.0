Ext.define('AliveTracker.view.reports.Reports', {

    extend:'Ext.form.Panel',
    xtype:'reportsform',
    layout:'anchor',

    initComponent:function () {
        this.items = [
            {
                xtype:'combobox',
                itemId:'projectReports',
                allowBlank:false,
                fieldLabel: Locales.AliveTracker.REPORTS_LABEL_PROJECT,
                displayField:'name',
                editable:false
            },
            {
                xtype:'combobox',
                itemId:'userReports',
                allowBlank:false,
                fieldLabel: Locales.AliveTracker.REPORTS_LABEL_USER,
                store:'Users',
                displayField:'name',
                editable:false
            },
            {
                xtype:'combobox',
                itemId:'dateRangeComboReports',
                name:'dateRangeComboReports',
                allowBlank:false,
                fieldLabel:Locales.AliveTracker.REPORTS_LABEL_DATERANGE,
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
                allowBlank:false,
                hidden:true
            },
            {
                xtype:'button',
                text:Locales.AliveTracker.REPORTS_LABEL_EXPORT,
                formBind:true,
                disabled:true,
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
        this.fireEvent('dateRangeComboSelection', this.getComponent('dateRangeComboReports').getValue(), this.getComponent('dateRangeReports'));
    }
});