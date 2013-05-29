Ext.define('AliveTracker.view.projects.GroupProjects', {

    extend: 'Ext.Container',
    xtype: 'groupprojects',

    initComponent:function () {
        this.items = [
            {
                xtype: 'button',
                cls: 'all-views-button project-add-button',
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
                height: 787,
                itemId: 'groupProjectGrid',
                queryMode: 'local',
                store: 'projects.Projects',
                listeners: {
                    scope: this,
                    itemdblclick: this.onRowDoubleClick
                }
            }
        ];
        this.callParent(arguments);
    },

    onAddProjectClick: function(){
        this.fireEvent('addProject');
    },

    onRowDoubleClick: function(argGrid, argRecord, argItem, argRow){
        this.fireEvent('rowDoubleClick',argGrid,argRow);
    }
});