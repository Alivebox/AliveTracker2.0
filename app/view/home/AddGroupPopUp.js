Ext.define('AliveTracker.view.home.AddGroupPopUp', {

    extend:'Ext.window.Window',
    xtype:'addprojectpopup',
    title:'Groups',
    height:400,
    width:400,
    renderTo: Ext.getBody(),
    insert: true,
    initComponent:function () {
        this.logoUrlTextField = this.onCreateLogoUrlTextField();
        this.submitButton = this.onCreateSubmitButton();
        this.groupImageField = this.onCreateGroupImage();
        this.items = [
            {
                xtype: 'container',
                id: 'addEditGroupContainer',
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
                                fieldLabel: 'Group name',
                                allowBlank:false,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                name:'description',
                                fieldLabel: 'Description',
                                allowBlank:false,
                                maxLength:300
                            },
                            {
                                xtype: 'textfield',
                                name:'webSiteUrl',
                                fieldLabel: 'Website URL',
                                allowBlank:false,
                                maxLength:300,
                                vtype: 'url'
                            },
                            this.logoUrlTextField,
                            this.submitButton,
                            {
                                xtype: 'button',
                                name: 'cancel',
                                text: 'Cancel',
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
            this.fireEvent('onSaveAction', this);
    },

    onCreateSubmitButton: function(){
        var tmpSubmitButton = Ext.create('Ext.Button',{
            name: 'submitButton',
            text: 'Insert',
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
            name:'logoUrl',
            fieldLabel: 'Logo URL',
            allowBlank:false,
            maxLength:300,
            vtype: 'url'
        });
        return tmpLogoUrlTextField;
    }

 });