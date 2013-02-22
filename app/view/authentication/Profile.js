Ext.define('AliveTracker.view.authentication.Profile', {

    extend:'Ext.form.Panel',
    xtype:'profileform',

    initComponent:function () {
        this.items = [
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'image',
                        src: AliveTracker.defaults.Constants.PROFILE_LOGO_URL
                    },
                    {
                        xtype:'container',
                        items:[
                            {
                                xtype:'textfield',
                                itemId:'emailProfile',
                                fieldLabel:Locales.AliveTracker.PROFILE_LABEL_EMAIL,
                                allowBlank:false,
                                maxLength:50,
                                vtype:'email'
                            },
                            {
                                xtype:'textfield',
                                itemId:'nameProfile',
                                fieldLabel:Locales.AliveTracker.PROFILE_LABEL_NAME,
                                allowBlank:false,
                                maxLength:50
                            },
                            {
                                xtype: 'passwordverification',
                                name:'password'
                            }
                        ]
                    }
                ]
            },
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'button',
                        name:'save',
                        text: Locales.AliveTracker.USERS_LABEL_SAVE,
                        formBind: true,
                        disabled: true,
                        listeners:{
                            scope:this,
                            click:this.onSaveClick
                        }

                    },
                    {
                        xtype:'button',
                        name:'cancel',
                        text:Locales.AliveTracker.USERS_LABEL_CANCEL,
                        listeners:{
                            scope:this,
                            click:this.onCancelClick
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },

    onSaveClick:function () {
        this.fireEvent('saveAction',this);
    },

    onCancelClick:function () {
        this.fireEvent('cancelAction',this);
    }

});