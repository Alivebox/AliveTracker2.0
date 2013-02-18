Ext.define('AliveTracker.view.utils.DatePickerField', {

    extend:'Ext.Container',
    xtype:'datepickerfield',
    mixins:{
        field:'Ext.form.field.Field'
    },

    /**
     *Initialization of all items
     */
    initComponent:function () {
        var tmpDatePicker = this.onCreateDatePicker();
        this.items = [
            tmpDatePicker
        ];
        this.callParent(arguments);
    },

    /**
     * Sets the value to the component
     * @param argValue contains a valid date with dateFormat: 'c'
     */
    setValue:function (argValue) {
        var tmpStartDate = this.getComponent('datepicker');
        if (Ext.isEmpty(tmpStartDate) || Ext.isEmpty(argValue)){
            return;
        }
        tmpStartDate.setValue(Ext.Date.parse(argValue,'c'));
    },

    /**
     * Gets the value contained in the component
     * @return {date selected by user}
     */
    getValue:function () {
        var tmpStartDate = this.getComponent('datepicker');
        if (Ext.isEmpty(tmpStartDate)) {
            return null;
        }
        return tmpStartDate.getValue().toJSON();
    },

    /**
     * Initialize the date picker component
     * @return {returns initalized date picker component}
     */
    onCreateDatePicker: function() {
        var tmpDatePicker = Ext.create('Ext.picker.Date',{
            xtype: 'datepicker',
            name: 'datepicker',
            itemId: 'datepicker',
            allowBlank: this.allowBlank,
            listeners: this.listeners
        });
        return tmpDatePicker;
    }
});