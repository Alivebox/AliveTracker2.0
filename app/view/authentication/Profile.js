Ext.define('AliveTracker.view.authentication.Profile', {

    extend:'Ext.form.Panel',
    xtype:'profileform',
    requires:[
        'AliveTracker.view.utils.PasswordVerification'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype:'container',
                layout:'column',
                items:[
                    {
                        xtype:'image',
                        name:'image',
                        src: AliveTracker.defaults.Constants.PROFILE_LOGO_URL
                    },
                    {
                        xtype:'container',
                        items:[
                            {
                                xtype:'textfield',
                                itemId:'emailProfile',
                                name:'email',
                                fieldLabel:'Email',
                                allowBlank:false,
                                maxLength:50,
                                vtype:'email'
                            },
                            {
                                xtype:'textfield',
                                itemId:'nameProfile',
                                name:'name',
                                fieldLabel:'Name',
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
                        text:'Save',
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
                        text:'Cancel',
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