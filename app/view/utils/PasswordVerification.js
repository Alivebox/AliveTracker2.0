Ext.define('AliveTracker.view.utils.PasswordVerification', {

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
                fieldLabel:'Password',
                allowBlank:false,
                maxLength:20,
                minLength:8,
                vtype:'confirmPassword',
                comparePasswordField:'confirmPasswordProfile',
                inputType:'password'
            },
            {
                xtype:'textfield',
                itemId:'confirmPasswordProfile',
                fieldLabel:'Confirm Password',
                allowBlank:false,
                maxLength:20,
                minLength:8,
                inputType:'password',
                vtype:'confirmPassword',
                comparePasswordField:'passwordProfile'
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
    getValue:function (argValue) {
        var tmpPassword = this.getComponent('passwordProfile');
        if (Ext.isEmpty(tmpPassword)) {
            return null;
        }
        return tmpPassword.getValue();
    }

});