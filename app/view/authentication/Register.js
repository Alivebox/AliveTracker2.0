Ext.define('AliveTracker.view.authentication.Register', {
    extend:'Ext.form.Panel',
    xtype:'registerform',
    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'emailRegister',
                name:'email',
                fieldLabel:'Email',
                allowBlank:false,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype:'textfield',
                itemId:'passwordRegister',
                name:'password',
                fieldLabel:'Password',
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
                        boxLabel:'Sign me up for newsletter',
                        itemId:'newsletterSelectedRegister',
                        name:'newsletterSelected',
                        inputValue:'1'
                    },
                    {
                        xtype:'button',
                        name:'registerNow',
                        text:'Register Now',
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