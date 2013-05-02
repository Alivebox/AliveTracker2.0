Ext.define('AliveTracker.view.users.AssignUsersToProjects', {
    extend:'Ext.container.Container',
    xtype:'assignuserstoprojectsview',
    requires:[
        'AliveTracker.view.users.AssignedUsersGrid',
        'AliveTracker.view.users.UsersList'
    ],
    initComponent:function () {
        this.items = [
            {
                xtype: 'form',
                name: 'projectModelForm',
                cls: 'project-users-popup-view-form-container',
                items: [
                    {
                        xtype:'textfield',
                        name:'name',
                        cls: 'project-users-popup-view-forms-align',
                        fieldCls: 'project-users-popup-view-forms',
                        labelCls: 'project-users-popup-view-label',
                        allowBlank:false,
                        fieldLabel: Locales.AliveTracker.USERS_LABEL_PROJECT,
                        maxLength:250
                    },
                    {
                        xtype:'textfield',
                        name:'description',
                        cls: 'project-users-popup-view-forms-align',
                        fieldCls: 'project-users-popup-view-forms',
                        labelCls: 'project-users-popup-view-label',
                        fieldLabel:Locales.AliveTracker.USERS_LABEL_DESCRIPTION,
                        maxLength:250
                    }
                ]
            },
            {
                xtype:'container',
                layout:'hbox',
                items:[
                    {
                        xtype:'userslist',
                        name:'usersList',
                        store: 'users.ProjectUsers'
                    },
                    {
                        xtype:'container',
                        cls: 'project-arrow-buttons-container',
                        layout: 'vbox',
                        items:[
                            {
                                xtype:'button',
                                layout:'vbox',
                                text:null,
                                cls: 'project-arrow-button',
                                icon:AliveTracker.defaults.Constants.RIGHT_ARROW_BUTTON,
                                listeners:{
                                    scope: this,
                                    click: this.onAddElement
                                }
                            },
                            {
                                xtype:'button',
                                text:null,
                                cls: 'project-arrow-button',
                                icon:AliveTracker.defaults.Constants.LEFT_ARROW_BUTTON,
                                listeners:{
                                    scope: this,
                                    click: this.onRemoveElement
                                }
                            }
                        ]
                    },
                    {
                        xtype:'assignedusersgrid',
                        name:'assignedusersgrid',
                        store:'users.AssignedUsers'
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
                        cls: 'all-views-button project-button-align',
                        text: Locales.AliveTracker.USERS_LABEL_SAVE,
                        listeners:{
                            scope:this,
                            click:this.onSaveClick
                        }

                    },
                    {
                        xtype:'button',
                        name:'cancel',
                        cls: 'project-cancel-button',
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
        this.fireEvent('removeUserFromProjectButtonAction', this);
    },
    onAddElement: function(){
        this.fireEvent('addUserToProjectButtonAction', this);
    }
});



