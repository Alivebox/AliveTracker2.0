Ext.define('AliveTracker.view.users.AddUsersGroup', {

    extend: 'Ext.Container',
    xtype: 'addusersgroup',

    initComponent: function() {
        var me = this;
        this.autoCompleteBox = this.getAutoCompleteBox();
        this.items = [
            {
                xtype: 'container',
                cls: 'add-user-container',
                layout: 'hbox',
                items: [
                    this.autoCompleteBox,
                    {
                        xtype: 'button',
                        id: 'btnAddUser',
                        cls: 'all-views-button add-users-group-button',
                        icon:AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
                        iconAlign:'center',
                        listeners: {
                            scope: this,
                            'click' : 'onAddUserClick'
                        }
                    }
                ]
            },
            {
                xtype: 'usersgrid',
                cls: 'add-user-grid-container',
                height: 400,
                store: 'users.GroupUsers',
                name: 'usersGrid'
            },
            {
                xtype:'button',
                cls: 'all-views-button add-users-group-save-button',
                text:Locales.AliveTracker.PROJECTS_LABEL_SAVE,
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
            cls: 'add-users-group-form',
            store: Ext.getStore('users.NewUsers'),
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
