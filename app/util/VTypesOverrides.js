Ext.define('AliveTracker.util.VTypesOverrides',{

    statics: {

        init: function(){
            Ext.override(Ext.form.field.VTypes,{
                daterange:function (val, field) {
                    var date = field.parseDate(val);
                    if (!date) {
                        return false;
                    }
                    if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                        this.validateStartDate(field,date);
                    }
                    else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                        this.validateEndDate(field,date);
                    }
                    return true;
                },

                validateStartDate: function(argField,argDate){
                    var tmpParent = this.getParentContainer(argField);
                    if( Ext.isEmpty(tmpParent) ){
                        return;
                    }
                    var start = tmpParent.down('#' + argField.startDateField);
                    if( Ext.isEmpty(start) ){
                        return;
                    }
                    start.setMaxValue(argDate);
                    start.validate();
                    this.dateRangeMax = argDate;
                },

                validateEndDate: function(argField,argDate){
                    var tmpParent = this.getParentContainer(argField);
                    if( Ext.isEmpty(tmpParent) ){
                        return;
                    }
                    var end = tmpParent.down('#' + argField.endDateField);
                    if( Ext.isEmpty(end) ){
                        return;
                    }
                    end.setMinValue(argDate);
                    end.validate();
                    this.dateRangeMin = argDate;
                },

                getParentContainer: function(argField){
                    if( Ext.isEmpty(argField) ){
                        return null;
                    }
                    var tmpParent = argField.up('form');
                    if( Ext.isEmpty(tmpParent) ){
                        tmpParent = argField.up('container');
                    }
                    return tmpParent;
                },

                daterangeText:'Start date must be less than end date',

                confirmPassword:function (argValue,argField) {
                    var tmpParent = argField.ownerCt;
                    var tmpComparePasswordField = tmpParent.getComponent(argField.comparePasswordField);
                    if( Ext.isEmpty(tmpComparePasswordField) ){
                        return false;
                    }
                    var tmpComparePasswordFieldValue = tmpComparePasswordField.getValue();
                    if( !this.passwordsFieldsShoulBeValidated(argValue,tmpComparePasswordFieldValue) ){
                        return true;
                    }
                    if( argValue === tmpComparePasswordFieldValue ){
                        return true;
                    }
                    return false;
                },

                passwordsFieldsShoulBeValidated: function(argFirstPasswordValue,argSecondPasswordValue){
                    if( Ext.isEmpty(argFirstPasswordValue) || Ext.isEmpty(argSecondPasswordValue) ){
                        return false;
                    }
                    return true;
                },

                confirmPasswordText: 'Passwords do not match'
            })
        }

    }

});
