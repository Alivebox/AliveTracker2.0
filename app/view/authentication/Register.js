Ext.define('AliveTracker.view.authentication.Register', {
    extend:'Ext.container.Container',
    xtype:'registerform',
    cls: 'register-view-container',
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                cls: 'register-elements',
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
                xtype:'textfield',
                itemId:'emailRegister',
                cls: 'loginregister-field',
                fieldCls: 'loginregister-forms',
                emptyText: Locales.AliveTracker.REGISTER_LABEL_EMAIL,
                allowBlank:false,
                maxLength:50,
                vtype:'email'
            },
            {
                xtype: 'container',
                cls: 'loginregister-elements'
            },
            {
                xtype:'textfield',
                itemId:'passwordRegister',
                cls: 'loginregister-field',
                fieldCls: 'loginregister-forms',
                emptyText: Locales.AliveTracker.REGISTER_LABEL_PASSWORD,
                allowBlank:false,
                maxLength:20,
                minLength:8,
                inputType:'password'
            }
        ];
        this.callParent(arguments);
    },
    onRegisterActionClick:function () {
        this.fireEvent('registerAction',this);
    }
});