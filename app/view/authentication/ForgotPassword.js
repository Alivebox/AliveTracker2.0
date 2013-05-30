Ext.define('AliveTracker.view.authentication.ForgotPassword', {
    extend:'Ext.window.Window',
    xtype:'forgotpasswordpopup',
    cls: 'forgot-password-view',
    height: 140,
    width: 300,
    header: false,
    modal: true,
    resizable: false,

    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                cls: 'forgot-password-view-container',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_RESET_INSTRUCTION,
                        cls: 'forgot-password-view-txt'
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
                xtype:'textfield',
                itemId:'emailForgotPasswordView',
                cls: 'forgot-password-view-forms-align',
                fieldCls: 'forgot-password-view-forms',
                emptyText: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_MAIL,
                maxLength:50,
                vtype:'email',
                listeners:{
                    scope:this,
                    specialkey:this.onEnterKey
                }
            },
            {
                xtype:'button',
                cls: 'forgot-password-view-button',
                text: Locales.AliveTracker.FORGOT_PASSWORD_LABEL_SEND,
                listeners:{
                    scope:this,
                    click:this.onSendInstructionsClick
                }
            }
        ];
        this.callParent(arguments);
    },
    onSendInstructionsClick:function () {
        this.fireEvent('sendInstructionsClick',this);
    },

    onEnterKey:function (field, e) {
        if(e.getKey() == e.ENTER){
            this.fireEvent('sendInstructionsClick',this);
        }
    },

    onClosePopUp: function(){
        this.close();
    }

});