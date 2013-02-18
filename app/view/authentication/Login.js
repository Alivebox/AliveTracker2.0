Ext.define('AliveTracker.view.authentication.Login', {
    extend:'Ext.form.Panel',
    xtype:'loginform',
    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                itemId:'userNameLoginView',
                name:'userName',
                fieldLabel:'Username',
                allowBlank:false,
                maxLength:20
            },
            {
                xtype:'textfield',
                itemId:'passwordLoginView',
                name:'password',
                fieldLabel:'Password',
                allowBlank:false,
                maxLength:20,
                inputType:'password'
            },
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'button',
                        name:'login',
                        text:'Login',
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
                                name:'signUp',
                                text:'Sign-Up',
                                listeners:{
                                    scope:this,
                                    click:this.onSignUpClick
                                }
                            },
                            {
                                xtype:'button',
                                name:'forgotPassword',
                                text:'forgot password',
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