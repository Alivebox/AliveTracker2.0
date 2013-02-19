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
                maxLength:20,
                minLength: 8
            },
            {
                xtype:'textfield',
                itemId:'passwordLoginView',
                fieldLabel:Locales.AliveTracker.LOGIN_LABEL_PASSWORD,
                allowBlank:false,
                maxLength:20,
                minLength: 8,
                inputType:'password'
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
                                text: Locales.AliveTracker.LOGIN_LABEL_SIGNUP,
                                listeners:{
                                    scope:this,
                                    click:this.onSignUpClick
                                }
                            },
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
            }
        ];
        this.callParent(arguments);
    },
    onForgotPasswordClick:function () {
        this.fireEvent('navigateToForgotPasswordView',this);
    },
    onLoginClick:function () {
        this.fireEvent('loginAction',this);
    },
    onSignUpClick:function () {
        this.fireEvent('signUpAction',this);
    }
});