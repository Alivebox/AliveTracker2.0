Ext.define('AliveTracker.view.authentication.Register', {
    extend:'Ext.form.Panel',
    xtype:'registerform',
    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'emailRegister',
                fieldLabel:Locales.AliveTracker.REGISTER_LABEL_EMAIL,
                allowBlank:false,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype:'textfield',
                itemId:'passwordRegister',
                fieldLabel:Locales.AliveTracker.REGISTER_LABEL_PASSWORD,
                allowBlank:false,
                maxLength:20,
                minLength:8,
                inputType:'password'
            },
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'checkboxfield',
                        boxLabel:Locales.AliveTracker.REGISTER_LABEL_NEWSLETTER,
                        itemId:'newsletterSelectedRegister',
                        inputValue:'1'
                    },
                    {
                        xtype:'button',
                        text: Locales.AliveTracker.REGISTER_LABEL_REGISTER_NOW,
                        formBind: true,
                        disabled: true,
                        listeners:{
                            scope:this,
                            click:this.onRegisterActionClick
                        }

                    }
                ]
            }
        ];
        this.callParent(arguments);
    },
    onRegisterActionClick:function () {
        this.fireEvent('registerAction',this);
    }
});