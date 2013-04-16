Ext.define('AliveTracker.view.authentication.Login', {
    extend:'Ext.form.Panel',
    xtype:'loginform',
    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'userNameLoginView',
                fieldLabel: Locales.AliveTracker.LOGIN_LABEL_USERNAME,
                allowBlank:false,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype:'textfield',
                itemId:'passwordLoginView',
                fieldLabel:Locales.AliveTracker.LOGIN_LABEL_PASSWORD,
                allowBlank:false,
                maxLength:20,
                minLength: 8,
                inputType:'password',
                listeners:{
                    scope:this,
                    specialkey:this.onLoginEnter
                }
            },
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'button',
                        text:Locales.AliveTracker.LOGIN_LABEL_LOGIN,
                        formBind: true,
                        disabled: true,
                        listeners:{
                            scope:this,
                            click:this.onLoginClick
                        }
                    },
                    {
                        xtype:'container',
                        layout:'vbox',
                        items:[
                            {
                                xtype:'button',
                                name:'forgotPassword',
                                text: Locales.AliveTracker.LOGIN_LABEL_FORGOT_PASSWORD,
                                listeners:{
                                    scope:this,
                                    click:this.onForgotPasswordClick
                                }

                            }
                        ]
                    }
                ]
            },
            {
                xtype:'registerform'
            }
        ];
        this.callParent(arguments);
    },
    onForgotPasswordClick:function () {
        this.fireEvent('showForgotPassword',this);
    },
    onLoginClick:function () {
        var tmpUsernameField = this.down('textfield[itemId=userNameLoginView]');
        var tmpPasswordField = this.down('textfield[itemId=passwordLoginView]');
        this.fireEvent('login',tmpUsernameField.getValue(),tmpPasswordField.getValue());
    },
    onLoginEnter:function (field, e) {
        if(e.getKey() == e.ENTER){
            var tmpUsernameField = this.down('textfield[itemId=userNameLoginView]');
            var tmpPasswordField = this.down('textfield[itemId=passwordLoginView]');
            this.fireEvent('login',tmpUsernameField.getValue(),tmpPasswordField.getValue());
        }
    }
});