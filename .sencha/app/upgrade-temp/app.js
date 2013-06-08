// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.application({

    name:'AliveTracker',
    autoCreateViewport:false,

    requires: [
        'AliveTracker.defaults.Constants',
        'AliveTracker.util.VTypesOverrides',
        'AliveTracker.ux.AliveTrackerUxDependencies',
        'AliveTracker.defaults.WebServices'
    ],

    controllers: [
        'authentication.ForgotPasswordController',
        'authentication.ResetPasswordController',
        'authentication.LoginController',
        'authentication.RegisterController',
        'group.AddUsersGroupController',
        'group.GroupDetailController',
        'projects.LogBookController',
        'projects.GroupProjectsController',
        'reports.ReportsController',
        'users.AssignUsersToProjectsController',
        'users.UserProfileController',
        'header.HeaderController',
        'MainController'
    ],

    init: function () {
        Ext.supports['CSS3BorderRadius'] = true;
        Ext.getBody().removeCls('x-nbr x-nlg');
        Ext.getBody().removeCls('x-ie x-btn button');
    },

    launch:function () {
        debugger;
        this.loadConfigurationFile();
    },

    loadConfigurationFile: function(){
        var tmpParams = {
            fileUrl: "config/configFile.json"
        };
        Mercury.util.FileLoader.loadAndDecodeJsonFile('resources/fileLoader.php',tmpParams,this.onConfigLoaded,this.onConfigFail,this);
    },

    onConfigLoaded: function(argConfigFileObject){
        debugger;
        AliveTracker.util.VTypesOverrides.init();
        Mercury.Main.init(argConfigFileObject);
    },

    onConfigFail:function () {
        Mercury.core.ErrorsManager.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID);
    }

});