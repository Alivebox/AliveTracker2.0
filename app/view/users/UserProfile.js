Ext.define('AliveTracker.view.users.UserProfile', {

    extend:'Ext.container.Container',
    xtype: 'userprofile',
    initComponent: function() {
        this.items = [
            {
                xtype: 'formcontainer',
                modelClassName: 'AliveTracker.model.User',
                itemId: 'userform',
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: Locales.AliveTracker.PROFILE_LABEL_NAME,
                        name: 'name'
                    },
                    {
                        fieldLabel: Locales.AliveTracker.PROFILE_LABEL_EMAIL,
                        name: 'email',
                        readOnly: true,
                        listeners: {
                            scope: this,
                            afterrender: this.onLoadFields
                        }
                    },
                    {
                        fieldLabel: Locales.AliveTracker.PASSWORD_VERIFICATION_LABEL_PASSWORD,
                        name: 'password',
                        hidden: true,
                        itemId: 'passwordProfile',
                        inputType:'password'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Cambiar contraseña',
                listeners:{
                    scope:this,
                    click:this.onShowPassword
                }
            },
            {
                xtype: 'button',
                text: Locales.AliveTracker.PROJECTS_LABEL_SAVE,
                listeners:{
                    scope:this,
                    click:this.onSaveProfileUser
                }
            }
        ];
        this.callParent(arguments);
    },

    onLoadFields:function () {
        this.fireEvent('loadFields');
    },

    onSaveProfileUser:function () {
        this.fireEvent('editProfile');
    },

    onShowPassword:function (tmpButton) {
        this.fireEvent('showPasswordField', tmpButton);
    }
});