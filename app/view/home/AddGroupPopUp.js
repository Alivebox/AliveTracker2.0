Ext.define('AliveTracker.view.home.AddGroupPopUp', {
    extend:'Ext.window.Window',
    xtype:'addgrouppopup',
    cls: 'add-group-pop-up-view',
    height: 250,
    width: 300,
    header: false,
    resizable: false,
    renderTo: Ext.getBody(),
    insert: true,
    initComponent:function () {
        this.title = Locales.AliveTracker.HOME_LABEL_NEW_GROUP;
        this.logoUrlTextField = this.onCreateLogoUrlTextField();
        this.submitButton = this.onCreateSubmitButton();
        this.items = [
            {
                xtype: 'container',
                cls: 'add-group-pop-up-view-container',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.HOME_LABEL_NEW_GROUP,
                        cls: 'add-group-pop-up-view-txt'
                    },
                    {
                        xtype: 'image',
                        src: 'resources/images/delete.png',
                        listeners: {
                            el: {
                                scope: this,
                                click: this.onClosePopUp
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'addEditGroupContainer',
                itemId: 'addEditGroupContainer',
                name: 'homeGroup',
                items: [
                    {
                        xtype: 'form',
                        cls: 'add-group-pop-up-view-forms-align',
                        border: false,
                        name: 'groupModelForm',
                        items: [
                            {
                                xtype: 'textfield',
                                cls: 'add-group-pop-up-view-forms-align',
                                fieldCls: 'add-group-pop-up-view-forms',
                                name:'name',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_GROUP_NAME,
                                emptyText: Locales.AliveTracker.HOME_LABEL_GROUP_NAME,
                                allowBlank:false,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                cls: 'add-group-pop-up-view-forms-align',
                                fieldCls: 'add-group-pop-up-view-forms',
                                name:'description',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_DESCRIPTION,
                                emptyText: Locales.AliveTracker.HOME_LABEL_DESCRIPTION,
                                allowBlank:false,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                cls: 'add-group-pop-up-view-forms-align',
                                fieldCls: 'add-group-pop-up-view-forms',
                                name:'web_site_url',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_WEBSITE,
                                emptyText: Locales.AliveTracker.HOME_LABEL_WEBSITE,
                                allowBlank:false,
                                maxLength:300,
                                vtype: 'url'
                            },
                            this.logoUrlTextField
                        ]
                    }
                ]
            },
            this.submitButton
        ],
            this.callParent(arguments);
    },

    /**
     * Fires an event to be caught by the controller
     * */
    onSubmitAction: function(){
        this.fireEvent('onSaveAction', this);
    },

    onCreateSubmitButton: function(){
        var tmpSubmitButton = Ext.create('Ext.Button',{
            name: 'submitButton',
            cls: 'all-views-button',
            margin: {left:15},
            text: Locales.AliveTracker.HOME_LABEL_INSERT,
            formBind: true,
            disabled: true,
            listeners: {
                scope:this,
                click: this.onSubmitAction
            }
        });
        return tmpSubmitButton;
    },

    /**
     * Send a event to the controller to close windows
     * */
    onCloseWindows: function(){
        this.fireEvent('onCloseWindows', this);
    },

    onClosePopUp: function(){
        this.close();
    },

    /**
     * Create a logoUrl textField
     * */
    onCreateLogoUrlTextField: function(){
        var tmpLogoUrlTextField = Ext.create('Ext.form.field.Text',{
            cls: 'add-group-pop-up-view-forms-align',
            fieldCls: 'add-group-pop-up-view-forms',
            name:'logo_url',
            fieldLabel: Locales.AliveTracker.HOME_LABEL_LOGO_URL,
            emptyText: Locales.AliveTracker.HOME_LABEL_LOGO_URL,
            allowBlank:false,
            maxLength:300,
            vtype: 'url'
        });
        return tmpLogoUrlTextField;
    }

 });