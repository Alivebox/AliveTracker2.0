Ext.define('AliveTracker.view.projects.AddNotesPopUp', {
    extend:'Ext.window.Window',
    xtype:'addnotespopup',
    cls: 'add-notes-pop-up-view',
    height: 330,
    width: 480,
    header: false,
    resizable: false,
    modal: true,
    renderTo: Ext.getBody(),
    insert: true,
    initComponent:function () {
        this.items = [
            {
                xtype: 'container',
                cls: 'add-notes-pop-up-view-container',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'label',
                        text: Locales.AliveTracker.ACTIVITY_ADD_NOTES_LABEL,
                        cls: 'add-notes-pop-up-view-txt'
                    },
                    {
                        xtype: 'button',
                        cls: 'project-users-popup-view-icon',
                        icon: 'resources/images/delete.png',
                        listeners: {
                            scope: this,
                            click: this.onCloseClick
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                itemId: 'addNotesContainer',
                items: [
                    {
                        xtype: 'formcontainer',
                        modelClassName: 'AliveTracker.model.projects.Note',
                        itemId: 'noteForm',
                        cls: 'add-notes-pop-up-view-container',
                        layout: 'column',
                        items:[
                            {
                                xtype: 'textareafield',
                                cls: 'add-notes-popup-textarea-align',
                                itemId: 'noteTextArea',
                                name:'note',
                                fieldLabel: Locales.AliveTracker.ACTIVITY_NOTE_LABEL,
                                labelCls: 'add-notes-pop-up-view-label',
                                grow: false
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnAddNote',
                                cls: 'all-views-button add-notes-popup-icon',
                                text: Locales.AliveTracker.ACTIVITY_NOTE_ADD,
                                listeners: {
                                    scope:this,
                                    click: this.onAddNoteClick
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnEditNote',
                                cls: 'all-views-button add-notes-popup-icon',
                                hidden: true,
                                text: Locales.AliveTracker.ACTIVITY_NOTE_EDIT,
                                listeners: {
                                    scope:this,
                                    click: this.onEditNoteClick
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        itemId: 'gridNotes',
                        cls: 'add-notes-popup-grid',
                        hideHeaders: true,
                        height: 155,
                        store: 'projects.ActivityNotes',
                        listeners: {
                            scope:this,
                            select: this.onSelectRow,
                            itemmouseenter: this.onItemOver,
                            itemmouseleave: this.onItemBlur
                        },
                        columns: [
                            {
                                menuDisabled:true,
                                sortable: false,
                                dataIndex: 'note',
                                flex: 9
                            },
                            {
                                xtype:'actioncolumn',
                                itemId: 'deleteColumn',
                                sortable:false,
                                flex: 1,
                                align : 'center',
                                items:[
                                    {
                                        icon:AliveTracker.defaults.Constants.REMOVE_GRID_ROW_BUTTON,
                                        tooltip: Locales.AliveTracker.ACTIVITY_REMOVE_NOTE,
                                        scope:this,
                                        handler: this.onDeleteNote,
                                        getClass: function() {
                                            return 'x-hide-display';
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        name: 'btnSaveProject',
                        cls: 'all-views-button add-notes-popup-button',
                        text: Locales.AliveTracker.ACTIVITY_NOTE_SAVE,
                        listeners: {
                            scope:this,
                            click: this.onSaveNotesClick
                        }
                    }
                ]
            }
        ],
            this.callParent(arguments);
    },

    onSaveNotesClick: function(){
        this.fireEvent('saveNotes', this);
    },

    onAddNoteClick: function(){
        this.fireEvent('addNote');
    },

    onEditNoteClick: function(){
        this.fireEvent('editNote');
    },

    onSelectRow: function(argEvent, argRecord){
        this.fireEvent('selectRow', argRecord);
    },

    onItemOver: function(argView, argRecord, argItem){
        this.fireEvent('itemOver', argItem);
    },

    onItemBlur: function(argView, argRecord, argItem){
        this.fireEvent('itemBlur', argItem);
    },

    onDeleteNote: function(argGrid, argRowIndex){
        this.fireEvent('deleteNote', argRowIndex);
    },

    onCloseClick: function(){
        this.fireEvent('closeClick', this);
    }
});

