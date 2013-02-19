Ext.define('AliveTracker.view.users.AssignUsersToProjects', {
    extend:'Ext.container.Container',
    xtype:'assignuserstoprojectsview',
    requires:[
        'AliveTracker.view.users.UserRolesGrid',
        'AliveTracker.view.users.UsersList'
    ],

    initComponent:function () {
        this.items = [
            {
                xtype:'textfield',
                allowBlank:false,
                fieldLabel: Locales.AliveTracker.USERS_LABEL_PROJECT,
                maxLength:25,
                width:350
            },
            {
                xtype:'textareafield',
                grow:true,
                fieldLabel:Locales.AliveTracker.USERS_LABEL_DESCRIPTION,
                maxLength:250,
                width:350,
                anchor:'90%'
            },
            {
                xtype:'container',
                layout:'hbox',
                items:[
                    {
                        xtype:'userslist',
                        itemId: 'userslist',
                        store:'Users'
                    }, {
                        xtype:'container',
                        layout:'vbox',
                        items:[
                            {
                                xtype:'button',
                                text:null,
                                icon:AliveTracker.defaults.Constants.RIGHT_ARROW_BUTTON,
                                listeners:{
                                    scope: this,
                                    click: this.onAddElement
                                }
                            },
                            {
                                xtype:'button',
                                text:null,
                                icon:AliveTracker.defaults.Constants.LEFT_ARROW_BUTTON,
                                listeners:{
                                    scope: this,
                                    click: this.onRemoveElement
                                }
                            }
                        ]
                    },
                    {
                        xtype:'userrolesgrid',
                        itemId:'userrolesgrid',
                        store:'AssignedUsers'
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
        this.fireEvent('saveUsersToProjectAction', this, this.ownerCt);
    },
    onCancelClick:function () {
        this.fireEvent('cancelUsersToProjectAction', this.ownerCt);
    },
    onRemoveElement: function(){
        this.fireEvent('removeUserFromProjectButtonAction');
    },
    onAddElement: function(){
        this.fireEvent('addUserToProjectButtonAction');
    }
});



