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
                xtype: 'formcontainer',
                itemId: 'projectModelForm',
                modelClassName: 'AliveTracker.model.projects.Project',
                cls: 'project-users-popup-view-form-container',
                defaultType: 'textfield',
                items: [
                    {
                        name:'name',
                        itemId: 'projectName',
                        cls: 'project-users-popup-view-forms-align',
                        fieldCls: 'project-users-popup-view-forms',
                        labelCls: 'project-users-popup-view-label',
                        regex: /[a-zA-Z0-9]+/,
                        fieldLabel: Locales.AliveTracker.USERS_LABEL_PROJECT,
                        maxLength:250
                    },
                    {
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
                cls: 'project-grids-container',
                layout:'column',
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
                                cls: 'project-arrow-button',
                                icon:AliveTracker.defaults.Constants.RIGHT_ARROW_BUTTON,
                                listeners:{
                                    scope: this,
                                    click: this.onAddElement
                                }
                            },
                            {
                                xtype:'button',
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
                cls: 'project-buttons-container',
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



