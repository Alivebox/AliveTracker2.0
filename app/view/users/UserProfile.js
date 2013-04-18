Ext.define('AliveTracker.view.users.UserProfile', {

    extend:'Ext.container.Container',
    xtype: 'userprofile',
    initComponent: function() {
        this.items = [
            {
                xtype: 'textfield',
                itemId: 'nameProfile',
                fieldLabel: Locales.AliveTracker.PROFILE_LABEL_NAME
            },
            {
                xtype: 'textfield',
                itemId: 'emailProfile',
                readOnly: true,
                fieldLabel: Locales.AliveTracker.PROFILE_LABEL_EMAIL,
                listeners:{
                    scope:this,
                    afterrender:this.onLoadFields
                }
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
                xtype: 'textfield',
                itemId: 'passwordProfile',
                hidden: true,
                fieldLabel: Locales.AliveTracker.PASSWORD_VERIFICATION_LABEL_PASSWORD,
                inputType:'password'
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

    onShowPassword:function () {
        this.fireEvent('showPasswordField');
    }
});