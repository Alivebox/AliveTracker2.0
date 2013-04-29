Ext.define('AliveTracker.view.group.GroupProjects', {

    extend: 'Ext.Container',
    xtype: 'groupprojects',
    cls:'groupDetail',

    initComponent:function () {
        this.items = [
            {
                xtype: 'projectgrid',
                itemId: 'groupProjectGrid',
                queryMode: 'local',
                store: 'projects.Projects'
            },
            {
                xtype: 'button',
                cls: 'all-views-button project-add-button',
                text: null,
                icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
                listeners:{
                    scope: this,
                    click: this.onAddProjectClick
                }
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