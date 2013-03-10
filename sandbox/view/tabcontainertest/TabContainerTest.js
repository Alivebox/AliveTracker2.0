Ext.define('Sandbox.view.tabcontainertest.TabContainerTest', {

    extend:'Ext.container.Container',
    alias:'widget.tabcontainertest',

    initComponent:function () {
        this.items = [
            {
                xtype: 'tabcontainer',
                listeners: {
                    scope: this,
                    tabchange: function(argTabIndex,argTab){
                        console.log("Selected tab index = " + argTabIndex + " , tab title " + argTab.title);
                    }
                },
                items: [
                    {
                        title: 'Tab 1',
                        items: [
                            {
                                xtype: 'label',
                                text: 'Tab 1'
                            }
                        ]
                    },
                    {
                        title: 'Tab 2',
                        items: [
                            {
                                xtype: 'label',
                                text: 'Tab 2'
                            }
                        ]
                    },
                    {
                        title: 'Tab 3',
                        items: [
                            {
                                xtype: 'label',
                                text: 'Tab 3'
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }

});