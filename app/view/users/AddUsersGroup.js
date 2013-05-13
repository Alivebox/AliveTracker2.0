Ext.define('AliveTracker.view.users.AddUsersGroup', {

    extend: 'Ext.Container',
    xtype: 'addusersgroup',
    cls: 'users-container',

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
                        tooltip: Locales.AliveTracker.USERS_ADD_BUTTON,
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
            }
        ];

        me.callParent(arguments);
    },

    getAutoCompleteBox: function(){
        var tmpAutoCompleteBox = Ext.create('Framework.ux.form.AutoCompleteBox',{
            itemId: 'autoCompleteBox',
            displayField: 'email',
            cls: 'add-users-group-form',
            invalidCls: 'add-users-group-form-invalid',
            store: Ext.getStore('users.NewUsers'),
            listeners: {
                scope: this,
                executeSearch: this.onExecuteSearch,
                specialkey:this.onEnterPressed
            }
        });

        return tmpAutoCompleteBox;
    },

    onAddUserClick: function(){
        this.fireEvent('addUserClick',this.autoCompleteBox.getValue());
    },

    onExecuteSearch: function(){
        this.fireEvent('comboUsersKeyUp', this.autoCompleteBox.getValue(),this.autoCompleteBox);
    },

    onEnterPressed:function (field, e) {
        if(e.getKey() == e.ENTER){
            this.fireEvent('addUserClick',this.autoCompleteBox.getValue());
        }
    }
});
