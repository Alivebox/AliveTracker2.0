Ext.define('AliveTracker.view.users.UserProfile', {

    extend:'Ext.container.Container',
    xtype: 'userprofile',
    cls: 'userprofile-main-container',
    initComponent: function() {
        this.items = [
            {
                xtype: 'formcontainer',
                cls: 'userprofile-formcontainer',
                modelClassName: 'AliveTracker.model.users.User',
                itemId: 'userform',
                defaultType: 'textfield',
                items: [
                    {
                        xtype: 'container',
                        layout: 'column',
                        items:[
                            {
                                xtype: 'button',
                                cls:'home-button',
                                tooltip: Locales.AliveTracker.GO_HOME_BUTTON,
                                listeners:{
                                    scope: this,
                                    click: this.onGoHome
                                }
                            },
                            {
                                xtype: 'label',
                                text: Locales.AliveTracker.PROFILE_TITLE,
                                cls:'profile-title'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'userprofile-container',
                        layout: 'column',
                        items:[
                            {
                                xtype: 'label',
                                text: Locales.AliveTracker.PROFILE_LABEL_NAME,
                                cls: 'userprofile-label'
                            },
                            {
                                xtype: 'textfield',
                                cls: 'userprofile-form-align',
                                fieldCls: 'userprofile-form',
                                name: 'name'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'userprofile-container',
                        layout: 'column',
                        items:[
                            {
                                xtype: 'label',
                                text: Locales.AliveTracker.PROFILE_LABEL_EMAIL,
                                cls: 'userprofile-label'
                            },
                            {
                                xtype: 'textfield',
                                cls: 'userprofile-form-align',
                                fieldCls: 'userprofile-form',
                                name: 'email',
                                readOnly: true
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'userprofile-container',
                        hidden: true,
                        itemId: 'passwordContainer',
                        layout: 'column',
                        items:[
                            {
                                xtype: 'label',
                                text: Locales.AliveTracker.PASSWORD_VERIFICATION_LABEL_PASSWORD,
                                cls: 'userprofile-label'
                            },
                            {
                                xtype: 'textfield',
                                cls: 'userprofile-form-align',
                                fieldCls: 'userprofile-form',
                                name: 'password',
                                itemId: 'passwordProfile',
                                inputType:'password'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'button',
                cls: 'all-views-button userprofile-button',
                text: 'Cambiar contraseña',
                listeners:{
                    scope:this,
                    click:this.onShowPassword
                }
            },
            {
                xtype: 'button',
                cls: 'all-views-button userprofile-button',
                text: Locales.AliveTracker.PROJECTS_LABEL_SAVE,
                listeners:{
                    scope:this,
                    click:this.onSaveProfileUser
                }
            }
        ];
        this.callParent(arguments);
    },

    onSaveProfileUser:function () {
        this.fireEvent('editProfile');
    },

    onShowPassword:function (tmpButton) {
        this.fireEvent('showPasswordField', tmpButton);
    },

    onGoHome: function(){
        this.fireEvent('goHome', this);
    }
});