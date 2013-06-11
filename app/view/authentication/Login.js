Ext.define('AliveTracker.view.authentication.Login', {
    extend:'Ext.container.Container',
    xtype:'loginform',
    cls: 'login-form-container',
    initComponent:function () {
        this.items = [
            {
                xtype: 'formcontainer',
                modelClassName: 'AliveTracker.model.authentication.LoginUser',
                itemId: 'loginFormContainer',
                defaultType: 'textfield',
                items: [
                    {
                        name: 'email',
                        itemId:'userNameLoginView',
                        cls: 'loginregister-field',
                        fieldCls: 'loginregister-forms',
                        emptyText: Locales.AliveTracker.LOGIN_LABEL_USERNAME,
                        maxLength:50
                    },
                    {
                        xtype: 'container',
                        cls: 'login-password-container',
                        layout: {
                            type: 'column'
                        },

                        items: [
                            {
                                xtype:'textfield',
                                name: 'password',
                                itemId:'passwordLoginView',
                                cls: 'loginregister-short-field',
                                fieldCls: 'loginregister-forms loginregister-forms-password',
                                emptyText: Locales.AliveTracker.LOGIN_LABEL_PASSWORD,
                                inputType:'password',
                                listeners:{
                                    scope:this,
                                    specialkey:this.onLoginEnter
                                }
                            },
                            {
                                xtype:'button',
                                text:Locales.AliveTracker.LOGIN_LABEL_LOGIN,
                                cls: 'loginregister-button',
                                listeners:{
                                    scope:this,
                                    click:this.onLoginClick
                                }
                            }]
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'login-forgotpassword-container',
                layout: {
                    type: 'column'
                },

                items: [
                    {
                        xtype: 'box',
                        cls: 'loginregister-label',
                        autoEl: {
                            tag: 'a',
                            href: '#',
                            html: Locales.AliveTracker.LOGIN_LABEL_FORGOT_PASSWORD
                        },
                        listeners: {
                            scope: this,
                            render: function(c){
                                c.getEl().on('click', this.onForgotPasswordClick, this, {stopEvent: true});
                            }
                        }
                    }]
            }
        ];
        this.callParent(arguments);
    },
    onForgotPasswordClick:function () {
        this.fireEvent('forgotPasswordClick',this);
    },
    onLoginClick:function () {
        this.fireEvent('login');
    },
    onLoginEnter:function (field, e) {
        if(e.getKey() == e.ENTER){
            this.fireEvent('login');
        }
    }
});