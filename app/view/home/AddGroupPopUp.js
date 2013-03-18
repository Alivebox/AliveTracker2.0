Ext.define('AliveTracker.view.home.AddGroupPopUp', {

    extend:'Ext.window.Window',
    xtype:'addgrouppopup',
    height:400,
    width:400,
    renderTo: Ext.getBody(),
    insert: true,
    initComponent:function () {
        this.title = Locales.AliveTracker.HOME_LABEL_NEW_GROUP;
        this.logoUrlTextField = this.onCreateLogoUrlTextField();
        this.submitButton = this.onCreateSubmitButton();
        this.groupImageField = this.onCreateGroupImage();
        this.items = [
            {
                xtype: 'container',
                id: 'addEditGroupContainer',
                itemId: 'addEditGroupContainer',
                name: 'homeGroup',
                layout: 'column',
                items: [
                    {
                        xtype: 'form',
                        name: 'groupModelForm',
                        items: [
                            {
                                xtype: 'textfield',
                                name:'name',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_GROUP_NAME,
                                allowBlank:false,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                name:'description',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_DESCRIPTION,
                                allowBlank:false,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                name:'webSiteUrl',
                                fieldLabel: Locales.AliveTracker.HOME_LABEL_WEBSITE,
                                allowBlank:false,
                                maxLength:300,
                                vtype: 'url'
                            },
                            this.logoUrlTextField,
                            this.submitButton,
                            {
                                xtype: 'button',
                                name: 'cancel',
                                text: Locales.AliveTracker.HOME_LABEL_CANCEL,
                                listeners: {
                                    scope:this,
                                    click:"onCloseWindows"
                                }
                            }
                        ]
                    },
                    this.groupImageField
                ]

            }
        ],
            this.callParent(arguments);
    },

    /**
     * Create Ext.Img component
     * */
    onCreateGroupImage: function(){
        var tmpImage = Ext.create('Ext.Img', {
            renderTo: Ext.getBody()
        });
        return tmpImage;
    },

    /**
     * Fires an event to be caught by the controller
     * */
    onSubmitAction: function(){
        this.fireEvent('onSaveAction', this.getComponent(0).getComponent(0).items.items);
    },

    onCreateSubmitButton: function(){
        var tmpSubmitButton = Ext.create('Ext.Button',{
            name: 'submitButton',
            text: Locales.AliveTracker.HOME_LABEL_INSERT,
            formBind: true,
            disabled: true,
            listeners: {
                scope:this,
                click:'onSubmitAction'
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

    /**
     * Create a logoUrl textField
     * */
    onCreateLogoUrlTextField: function(){
        var tmpLogoUrlTextField = Ext.create('Ext.form.field.Text',{
            name:'logo_url',
            fieldLabel: Locales.AliveTracker.HOME_LABEL_LOGO_URL,
            allowBlank:false,
            maxLength:300,
            vtype: 'url'
        });
        return tmpLogoUrlTextField;
    }

 });