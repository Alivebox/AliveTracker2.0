Ext.define('AliveTracker.view.group.AddGroupPopUp', {
    extend:'Ext.window.Window',
    xtype:'addgrouppopup',
    cls: 'add-group-pop-up-view',
    height: 205,
    width: 300,
    header: false,
    resizable: false,
    modal: true,
    renderTo: Ext.getBody(),
    insert: true,
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                cls: 'add-group-pop-up-view-container',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.HOME_LABEL_NEW_GROUP,
                        cls: 'add-group-pop-up-view-txt'
                    },
                    {
                        xtype: 'button',
                        cls: 'project-users-popup-view-icon',
                        icon: 'resources/images/delete.png',
                        listeners: {
                            scope: this,
                            click: this.onCloseWindow
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                itemId: 'addEditGroupContainer',
                name: 'homeGroup',
                items: [
                    {
                        xtype: 'formcontainer',
                        cls: 'add-group-pop-up-view-forms-align',
                        modelClassName: 'AliveTracker.model.groups.Group',
                        name: 'groupModelForm',
                        items: [
                            {
                                xtype: 'textfield',
                                name:'id',
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                cls: 'add-group-pop-up-view-forms-align',
                                fieldCls: 'add-group-pop-up-view-forms',
                                name:'name',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_GROUP_NAME,
                                labelWidth: 120,
                                labelCls: 'add-group-pop-up-view-label',
                                emptyText: Locales.AliveTracker.HOME_LABEL_GROUP_NAME,
                                regex: /[a-zA-Z0-9]+/,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                cls: 'add-group-pop-up-view-forms-align',
                                fieldCls: 'add-group-pop-up-view-forms',
                                name:'description',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_DESCRIPTION,
                                labelWidth: 120,
                                labelCls: 'add-group-pop-up-view-label',
                                emptyText: Locales.AliveTracker.HOME_LABEL_DESCRIPTION,
                                regex: /[a-zA-Z0-9]+/,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                cls: 'add-group-pop-up-view-forms-align',
                                fieldCls: 'add-group-pop-up-view-forms',
                                name:'web_site_url',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_WEBSITE,
                                labelWidth: 120,
                                labelCls: 'add-group-pop-up-view-label',
                                emptyText: Locales.AliveTracker.HOME_LABEL_WEBSITE,
                                maxLength:300,
                                vtype: 'url'
                            },
                            {
                                xtype: 'button',
                                name: 'btnSaveProject',
                                cls: 'all-views-button add-group-pop-up-button-align',
                                text: Locales.AliveTracker.HOME_LABEL_INSERT,
                                formBind: true,
                                disabled: true,
                                listeners: {
                                    scope:this,
                                    click: this.onSaveGroupClick
                                }
                            }
                        ]
                    }
                ]
            }
        ],
            this.callParent(arguments);
    },

    onSaveGroupClick: function(){
        this.fireEvent('saveGroup', this);
    },

    onCloseWindow: function(){
        this.fireEvent('closeWindow', this);
    }
 });

