Ext.define('AliveTracker.ux.DateRange', {

    extend:'Ext.Container',
    xtype:'daterange',
    mixins:{
        labelable:'Ext.form.Labelable',
        fieldAncestor:'Ext.form.FieldAncestor',
        field:'Ext.form.field.Field'
    },

    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'report-date-container',
                itemId: 'startContainer',
                items:[
                    {
                        xtype: 'image',
                        cls: 'report-icons',
                        src: 'resources/images/calendar.png'
                    },
                    {
                        xtype:'datefield',
                        name:'startdt',
                        itemId:'startdt',
                        shrinkWrap: true,
                        fieldCls: 'report-form',
                        endDateField:'enddt',
                        vtype:'daterange',
                        hidden: this.hidden,
                        allowBlank: this.allowBlank,
                        showToday: false,
                        listeners: {
                            scope: this,
                            select: function(){
                                this.fireEvent('validitychange');
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                itemId: 'endContainer',
                items:[
                    {
                        xtype: 'image',
                        cls: 'report-icons',
                        src: 'resources/images/calendar.png'
                    },
                    {
                        xtype:'datefield',
                        name:'enddt',
                        itemId:'enddt',
                        fieldCls: 'report-form',
                        startDateField:'startdt',
                        vtype:'daterange',
                        hidden: this.hidden,
                        allowBlank: this.allowBlank,
                        showToday: false,
                        listeners: {
                            scope: this,
                            select: function(){
                                this.fireEvent('validitychange');
                            }
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },
    setValue:function (argValue) {
        var data=Ext.decode(argValue);
        var tmpStartDate = this.getComponent('startContainer').getComponent('startdt');
        var tmpEndDate = this.getComponent('endContainer').getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate) || Ext.isEmpty(data) || data.length < 2) {
            return;
        }
        tmpStartDate.setValue(Ext.Date.parse(data[0].value,'c'));
        tmpEndDate.setValue(Ext.Date.parse(data[1].value,'c'));
    },
    getValue:function (argValue) {
        var tmpStartDate = this.getComponent('startContainer').getComponent('startdt');
        var tmpEndDate = this.getComponent('endContainer').getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate) || Ext.isEmpty(tmpStartDate.getValue()) || Ext.isEmpty(tmpEndDate.getValue())) {
            return null;
        }
        return "[{\"value\":\"" +tmpStartDate.getValue().toJSON()+ "\"},{\"value\":\""+tmpEndDate.getValue().toJSON()+"\"}]";
    },

    getStartValue:function (argValue) {
        var tmpStartDate = this.getComponent('startContainer').getComponent('startdt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpStartDate.getValue()) ) {
            return null;
        }
        return tmpStartDate.getValue().toJSON();
    },

    getEndValue:function (argValue) {
        var tmpEndDate = this.getComponent('endContainer').getComponent('enddt');
        if (Ext.isEmpty(tmpEndDate) || Ext.isEmpty(tmpEndDate.getValue())) {
            return null;
        }
        return tmpEndDate.getValue().toJSON();
    },

    setHiddenProperty: function(argValue){
        var tmpStartDate = this.getComponent('startContainer').getComponent('startdt');
        var tmpEndDate = this.getComponent('endContainer').getComponent('enddt');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(tmpEndDate)) {
            return;
        }
        this.setVisible(!argValue);
        tmpStartDate.setVisible(!argValue);
        tmpEndDate.setVisible(!argValue);
    }
});