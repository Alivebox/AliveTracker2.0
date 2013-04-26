Ext.define('AliveTracker.view.group.GroupProjects', {

    extend: 'Ext.Container',
    xtype: 'groupprojects',
    cls:'groupDetail',

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
                xtype: 'projectgrid',
                itemId: 'groupProjectGrid',
                queryMode: 'local',
                store: 'projects.Projects'
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