Ext.define('AliveTracker.view.group.AddUsersGroup', {

    extend: 'Ext.Container',
    xtype: 'addusersgroup',

    initComponent: function() {
        var me = this;
        this.userscombo = this.getUsersCombo();
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    this.userscombo,
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
                xtype: 'usersGrid',
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

    getUsersCombo: function(){
        var tmpTypeahead = new Ext.form.ComboBox({
            triggerAction:'all',
            typeAhead:true,
            mode:'remote',
            minChars:2,
            forceSelection:true,
            hideTrigger:true,
            id: 'usersCombo',
            store: 'Users',
            valueField: 'name',
            displayField: 'name',
            enableKeyEvents: true,
            lastQuery: '',
            listeners: {
                scope: this,
                'keyup': 'onComboKeyUp',
                'beforequery': function(queryEvent) {
                    queryEvent.combo.onLoad();
                    // prevent doQuery from firing and clearing out my filter.
                    queryEvent.combo.expand();
                    return false;
                }
            }
        });

        return tmpTypeahead;
    },

    onComboKeyUp: function(){
        this.fireEvent('comboUsersKeyUp', this.userscombo.getRawValue());
    },

    onAddUserClick: function(){
        this.fireEvent('addUserClick');
    },
    onSaveGroupUsers: function(){
        this.fireEvent('saveGroupUsers');
    }
});
