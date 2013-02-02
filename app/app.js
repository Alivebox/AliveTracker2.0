Ext.Loader.setConfig({
    enabled:true
});
Ext.Loader.setPath('Framework', 'framework');
Ext.require(
    'Framework.Main'
);

Ext.application({

    name:'AliveTracker',

    autoCreateViewport:false,

    launch:function () {
        Framework.Main.init({
            scope:this,
            localizationEnabled:true,
            callback:this.onFrameworkInitialized
        });
    },

    onFrameworkInitialized:function () {
        Ext.create('Ext.container.Viewport', {
            items:[
                {
                    xtype:'container',
                    items:[
                        {
                            xtype:'label',
                            text:'Hello World'
                        },
                        {
                            xtype:'button',
                            text:Locales.TEST_LABEL,
                            listeners:{
                                scope:this,
                                click:function () {
                                    Framework.core.LocalizationManager.setLanguageByAbbreviation("en");
                                }
                            }
                        }
                    ]
                }
            ]
        });
    }


});
