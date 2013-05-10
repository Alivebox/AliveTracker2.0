Ext.define('AliveTracker.view.projects.GroupProjects', {

    extend: 'Ext.Container',
    xtype: 'groupprojects',
    cls:'groupDetail main-containers',

    initComponent:function () {
        this.items = [
            {
                xtype: 'button',
                cls: 'all-views-button project-add-button',
                text: null,
                icon: AliveTracker.defaults.Constants.ADD_ELEMENT_BUTTON,
                tooltip: Locales.AliveTracker.PROJECTS_ADD_BUTTON,
                listeners:{
                    scope: this,
                    click: this.onAddProjectClick
                }
            },
            {
                xtype: 'projectgrid',
                cls: 'project-grid-container',
                height: 400,
                itemId: 'groupProjectGrid',
                queryMode: 'local',
                store: 'projects.Projects'
            }
        ];
        this.callParent(arguments);
    },

    onAddProjectClick: function(){
        this.fireEvent('addProject');
    }
});