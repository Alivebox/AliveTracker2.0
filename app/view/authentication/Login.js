Ext.define('AliveTracker.view.authentication.Login', {
    extend:'Ext.container.Container',
    xtype:'loginform',
    cls: 'login-view-container',
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
                        allowBlank:false,
                        maxLength:50,
                        vtype:'email'
                    },
                    {
                        xtype: 'container',
                        cls: 'loginregister-elements',
                        layout: {
                            type: 'hbox'
                        },

                        items: [
                            {
                                xtype:'textfield',
                                name: 'password',
                                itemId:'passwordLoginView',
                                cls: 'loginregister-short-field',
                                fieldCls: 'loginregister-forms',
                                emptyText: Locales.AliveTracker.LOGIN_LABEL_PASSWORD,
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
                cls: 'loginregister-elements',
                layout: {
                    type: 'hbox'
                },

                items: [
                    {
                        xtype: 'checkboxfield',
                        cls: 'loginregister-checkbox'
                    },
                    {
                        xtype: 'label',
                        cls: 'loginregister-label',
                        text: Locales.AliveTracker.LOGIN_LABEL_REMEMBER_ME
                    },
                    {
                        xtype: 'label',
                        cls: 'loginregister-label',
                        margin: {left:10},
                        text: '|'
                    },
                    {
                        xtype: 'box',
                        cls: 'loginregister-label',
                        margin: {left:10},
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