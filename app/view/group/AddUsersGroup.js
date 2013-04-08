Ext.define('AliveTracker.view.group.AddUsersGroup', {

    extend: 'Ext.Container',
    xtype: 'addusersgroup',

    initComponent: function() {
        var me = this;
        this.autoCompleteBox = this.getAutoCompleteBox();
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    this.autoCompleteBox,
                    {
                        xtype: 'button',
                        id: 'btnAddUser',
                        text: Locales.AliveTracker.ADD_USERS_GROUP_LABEL_ADD_USER,
                        listeners: {
                            scope: this,
                            'click' : 'onAddUserClick'
                        }
                    }
                ]
            },
            {
                xtype: 'usersgrid',
                store: 'GroupUsers',
                name: 'usersGrid'
            },
            {
                xtype:'button',
                text:Locales.AliveTracker.PROJECTS_LABEL_SAVE,
                icon:AliveTracker.defaults.Constants.SAVE_ELEMENT_BUTTON,
                iconAlign:'right',
                listeners:{
                    scope:this,
                    click:this.onSaveGroupUsers
                }
            }
        ];

        me.callParent(arguments);
    },

    getAutoCompleteBox: function(){
        var tmpAutoCompleteBox = Ext.create('Framework.ux.form.AutoCompleteBox',{
            displayField: 'email',
            store: Ext.getStore('NewUsers'),
            listeners: {
                scope: this,
                executeSearch: this.onExecuteSearch
            }
        });

        return tmpAutoCompleteBox;
    },

    onAddUserClick: function(){
        this.fireEvent('addUserClick',this.autoCompleteBox.getValue());
    },

    onSaveGroupUsers: function(){
        this.fireEvent('saveGroupUsers');
    },

    onExecuteSearch: function(){
        this.fireEvent('comboUsersKeyUp', this.autoCompleteBox.getValue(),this.autoCompleteBox);
    }
});
