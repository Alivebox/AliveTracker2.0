Ext.define('AliveTracker.ux.PasswordVerification', {

    extend:'Ext.Container',
    xtype:'passwordverification',
    mixins:{
        labelable:'Ext.form.Labelable',
        fieldAncestor:'Ext.form.FieldAncestor',
        field:'Ext.form.field.Field'
    },
    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'passwordProfile',
                fieldLabel: Locales.AliveTracker.PASSWORD_VERIFICATION_LABEL_PASSWORD,
                allowBlank:false,
                maxLength:20,
                minLength:8,
                vtype:'confirmPassword',
                comparePasswordField:'confirmPasswordProfile',
                inputType:'password',
                cls:'text-field-password-verification'
            },
            {
                xtype:'textfield',
                itemId:'confirmPasswordProfile',
                fieldLabel:Locales.AliveTracker.PASSWORD_VERIFICATION_LABEL_CONFIRM_PASSWORD,
                allowBlank:false,
                maxLength:20,
                minLength:8,
                inputType:'password',
                vtype:'confirmPassword',
                comparePasswordField:'passwordProfile',
                cls:'text-field-password-verification'
            }
        ];
        this.callParent(arguments);
    },
    setValue:function (argValue) {
        var tmpPassword = this.getComponent('passwordProfile');
        var tmpConfirmPassword = this.getComponent('confirmPasswordProfile');
        if (Ext.isEmpty(tmpPassword) || Ext.isEmpty(tmpConfirmPassword)) {
            return;
        }
        tmpPassword.setValue(argValue);
        tmpConfirmPassword.setValue(argValue);
    },
    getValue:function () {
        var tmpPassword = this.getComponent('passwordProfile');
        if (Ext.isEmpty(tmpPassword)) {
            return null;
        }
        return tmpPassword.getValue();
    },
    isValid:function(){
        var tmpPassword = this.getComponent('passwordProfile');
        var tmpConfirmPassword = this.getComponent('confirmPasswordProfile');
        if(tmpPassword.isValid() && tmpPassword.isValid()){
            return true;
        }
        return false;
    }
});