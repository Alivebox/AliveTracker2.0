Ext.define('AliveTracker.view.reports.Reports', {
    extend:'Ext.form.Panel',
    xtype:'reportsform',
    layout:'anchor',
    requires:[
        'AliveTracker.view.utils.DateRange'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype:'label',
                name:'reports',
                text:'Reports'
            },
            {
                xtype:'combobox',
                itemId:'groupReports',
                name:'group',
                allowBlank:false,
                fieldLabel:'Group',
                store:'Groups',
                displayField:'name',
                editable:false
            },
            {
                xtype:'combobox',
                itemId:'projectReports',
                name:'project',
                allowBlank:false,
                fieldLabel:'Project',
                store:'Projects',
                displayField:'name',
                editable:false
            },
            {
                xtype:'combobox',
                itemId:'userReports',
                name:'user',
                allowBlank:false,
                fieldLabel:'User',
                store:'Users',
                displayField:'name',
                editable:false
            },
            {
                xtype:'combobox',
                itemId:'dateRangeComboReports',
                name:'dateRangeCombo',
                allowBlank:false,
                fieldLabel:'Date Range',
                editable:false,
                store:[
                    [AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_OPTION, AliveTracker.defaults.Constants.REPORTS_CUSTOM_DATERANGE_DESCRIPTION],
                    [AliveTracker.defaults.Constants.REPORTS_LAST_DAY_DATERANGE_OPTION, AliveTracker.defaults.Constants.REPORTS_LAST_DAY_DATERANGE_DESCRIPTION],
                    [AliveTracker.defaults.Constants.REPORTS_LAST_SEVEN_DAYS_DATERANGE_OPTION, AliveTracker.defaults.Constants.REPORTS_LAST_SEVEN_DAYS_DATERANGE_DESCRIPTION],
                    [AliveTracker.defaults.Constants.REPORTS_LAST_TWO_WEEKS_DATERANGE_OPTION, AliveTracker.defaults.Constants.REPORTS_LAST_TWO_WEEKS_DATERANGE_DESCRIPTION],
                    [AliveTracker.defaults.Constants.REPORTS_LAST_MONTH_DATERANGE_OPTION, AliveTracker.defaults.Constants.REPORTS_LAST_MONTH_DATERANGE_DESCRIPTION]
                ],
                listeners:{
                    scope:this,
                    change:this.onDateRangeComboChanged
                }
            },
            {
                xtype:'daterange',
                itemId:'dateRangeReports',
                name:'dateRangeField',
                allowBlank:false,
                hidden:true
            },
            {
                xtype:'button',
                name:'export',
                text:'Export',
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