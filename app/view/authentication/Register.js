Ext.define('AliveTracker.view.authentication.Register', {
    extend:'Ext.container.Container',
    xtype:'registerform',
    cls: 'register-form-container',
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                layout: {
                    type: 'column'
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
                    }
                ]
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
                        maxLength:50
                    },
                    {
                        name: 'password',
                        itemId:'passwordRegister',
                        cls: 'loginregister-field register-password-field',
                        fieldCls: 'loginregister-forms',
                        emptyText: Locales.AliveTracker.REGISTER_LABEL_PASSWORD,
                        maxLength:20,
                        inputType:'password',
                        listeners:{
                            scope:this,
                            specialkey:this.onRegisterEnter
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },
    onRegisterActionClick:function () {
        this.fireEvent('registerClick',this);
    },

    onRegisterEnter:function (field, e) {
        if(e.getKey() == e.ENTER){
            this.fireEvent('registerClick',this);
        }
    }
});