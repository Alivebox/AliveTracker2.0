Ext.define('AliveTracker.ux.DateRange', {

    extend:'Ext.Container',
    xtype:'daterange',
    layout: 'column',

    initComponent:function () {
        this.items = [
            {
                xtype:'datefield',
                cls: 'report-date-field',
                name:'startdt',
                itemId:'startdt',
                endDateField:'enddt',
                editable: false,
                vtype:'daterange',
                hidden: this.hidden,
                allowBlank: this.allowBlank,
                fieldCls: 'report-date-form',
                triggerCls: 'date-trigger',
                showToday: false,
                listeners: {
                    scope: this,
                    select: this.onDateSelected
                }
            },
            {
                xtype:'datefield',
                name:'enddt',
                itemId:'enddt',
                startDateField:'startdt',
                editable: false,
                vtype:'daterange',
                hidden: this.hidden,
                allowBlank: this.allowBlank,
                fieldCls: 'report-date-form',
                triggerCls: 'date-trigger',
                showToday: false,
                listeners: {
                    scope: this,
                    select: this.onDateSelected
                }
            }
        ];
        this.callParent(arguments);
    },
    setValue:function (argValue) {
        var data=Ext.decode(argValue);
        var tmpStartDate = this.getComponent('startdt');
        var tmpEndDate = this.getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate) || Ext.isEmpty(data) || data.length < 2) {
            return;
        }
        tmpStartDate.setValue(Ext.Date.parse(data[0].value,'c'));
        tmpEndDate.setValue(Ext.Date.parse(data[1].value,'c'));
    },
    getValue:function (argValue) {
        var tmpStartDate = this.getComponent('startdt');
        var tmpEndDate = this.getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate) || Ext.isEmpty(tmpStartDate.getValue()) || Ext.isEmpty(tmpEndDate.getValue())) {
            return null;
        }
        return "[{\"value\":\"" +tmpStartDate.getValue().toJSON()+ "\"},{\"value\":\""+tmpEndDate.getValue().toJSON()+"\"}]";
    },

    setStartValue:function (argValue) {
        var tmpStartDate = this.getComponent('startdt');
        tmpStartDate.value = argValue;
    },

    setEndValue:function (argValue) {
        var tmpEndDate = this.getComponent('enddt');
        tmpEndDate = argValue;
    },

    getStartValue:function (argValue) {
        var tmpStartDate = this.getComponent('startdt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpStartDate.getValue()) ) {
            return null;
        }
        return tmpStartDate.getValue().toJSON();
    },

    getEndValue:function (argValue) {
        var tmpEndDate = this.getComponent('enddt');
        if (Ext.isEmpty(tmpEndDate) || Ext.isEmpty(tmpEndDate.getValue())) {
            return null;
        }
        return tmpEndDate.getValue().toJSON();
    },

    isValid: function(){
        if(this.allowBlank){
            return true;
        }
        if(!this.isVisible() ){
            return true;
        }
        var tmpStartDate = this.getComponent('startdt');
        var tmpEndDate = this.getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate) || Ext.isEmpty(tmpStartDate.getValue()) || Ext.isEmpty(tmpEndDate.getValue())) {
            return false;
        }
        return true;
    },

    setHiddenProperty: function(argValue){
        var tmpStartDate = this.getComponent('startdt');
        var tmpEndDate = this.getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate)) {
            return;
        }
        this.setVisible(!argValue);
        tmpStartDate.setVisible(!argValue);
        tmpEndDate.setVisible(!argValue);
    },

    onDateSelected: function(){
        this.fireEvent('validitychange');
        this.fireEvent('dateSelected');
    }
});