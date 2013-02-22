Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'Framework': 'framework'
    }
});

Ext.application({

    requires: [
        'Framework.Main',
        'AliveTracker.defaults.Constants',
        'AliveTracker.util.VTypesOverrides',
        'AliveTracker.ux.AliveTrackerUxDependencies'
    ],

    name:'AliveTracker',
    autoCreateViewport:false,

    controllers: [
        'authentication.ForgotPasswordController',
        'authentication.LoginController',
        'authentication.ProfileController',
        'authentication.RegisterController',
        'group.AddUsersGroupController',
        'group.GroupDetailController',
        'home.HomeController',
        'projects.LogBookController',
        'reports.ReportsController',
        'users.AssignUsersToProjectsController'
    ],

    launch:function () {
        this.loadConfigurationFile();
    },

    loadConfigurationFile: function(){
        var tmpParams = {
            fileUrl: "config/configFile.json"
        };
        Framework.util.FileLoader.loadAndDecodeJsonFile('resources/fileLoader.php',tmpParams,this.onConfigLoaded,this.onConfigFail,this);
    },

    onConfigLoaded: function(argConfigFileObject){
        AliveTracker.util.VTypesOverrides.init();
        Framework.Main.init({
            scope:this,
            config: argConfigFileObject
        });
    },

    onConfigFail:function () {
        Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID);
    }

});
