Ext.define('AliveTracker.view.group.GroupProjects', {

    extend: 'Ext.Container',
    xtype: 'groupprojects',

    initComponent:function () {
        this.items = [
            {
                xtype: 'button',
                text: Locales.AliveTracker.GROUP_PROJECT_LABEL_NEW_PROJECT,
                listeners:{
                    scope: this,
                    click: this.onAddProjectClick
                }
            },
            {
                xtype: 'projectGrid',
                itemId: 'groupProjectGrid'
            }
        ];
        this.callParent(arguments);
    },

    /**
     * Fire a event to GroupDetailController
     * */
    onAddProjectClick: function(){
        this.fireEvent('addProject');
    }
});