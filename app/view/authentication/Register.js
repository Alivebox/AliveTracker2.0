Ext.define('AliveTracker.view.authentication.Register', {
    extend:'Ext.container.Container',
    xtype:'registerform',
    cls: 'register-form-container',
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },

                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.REGISTER_LABEL_NEW,
                        cls: 'loginregister-titles'
                    },
                    {
                        xtype: 'box',
                        cls: 'register-link',
                        margin: {left:15},
                        autoEl: {
                            tag: 'a',
                            href: '#',
                            html: Locales.AliveTracker.REGISTER_LABEL_REGISTER_NOW
                        },
                        listeners: {
                            scope: this,
                            render: function(c){
                                c.getEl().on('click', this.onRegisterActionClick, this, {stopEvent: true});
                            }
                        }
                    }]
            },
            {
                xtype: 'formcontainer',
                modelClassName: 'AliveTracker.model.authentication.LoginUser',
                itemId: 'registerFormContainer',
                defaultType: 'textfield',
                items: [
                    {
                        name: 'email',
                        itemId:'emailRegister',
                        cls: 'loginregister-field register-username-field',
                        fieldCls: 'loginregister-forms',
                        emptyText: Locales.AliveTracker.REGISTER_LABEL_EMAIL,
                        allowBlank:false,
                        maxLength:50,
                        vtype:'email'
                    },
                    {
                        name: 'password',
                        itemId:'passwordRegister',
                        cls: 'loginregister-field register-password-field',
                        fieldCls: 'loginregister-forms',
                        emptyText: Locales.AliveTracker.REGISTER_LABEL_PASSWORD,
                        allowBlank:false,
                        maxLength:20,
                        inputType:'password'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },
    onRegisterActionClick:function () {
        this.fireEvent('registerClick',this);
    }
});