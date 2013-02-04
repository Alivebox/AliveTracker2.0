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
        this.loadConfigurationFile();
    },

    loadConfigurationFile: function(){
        Ext.Ajax.request({
            scope:this,
            url: "resources/fileLoader.php",
            method:'GET',
            params:{
                fileUrl: "config/configFile.json"
            },
            success:this.onConfigLoaded,
            failure:this.onConfigFail
        });
    },

    onConfigLoaded: function(argResponse){
        var tmpConfigFileString = argResponse.responseText;
        var tmpConfigFileObject = this.decodeConfigFileContent(tmpConfigFileString);
        if( Ext.isEmpty(tmpConfigFileObject) ){
            return;
        }
        Framework.Main.init({
            scope:this,
            configFileObject: tmpConfigFileObject,
            callback:this.onFrameworkInitialized
        });
    },

    decodeConfigFileContent:function (argFileContent) {
        try {
            this.configFileObject = Ext.decode(argFileContent);
        } catch (argError) {
            var tmpErrorMessage = Ext.util.Format.format(Framework.core.Defaults.FATAL_ERROR_INVALID_CONFIG_FILE,"resources/config/configFile.json");
            Framework.core.ErrorsManager.handleFatalError(tmpErrorMessage);
        }
        return this.configFileObject;
    },

    onConfigFail:function () {
        Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND);
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
