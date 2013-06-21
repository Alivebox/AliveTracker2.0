/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.application({

    name: 'AliveTracker',

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
        this.loadConfigurationFile();
    },

    loadConfigurationFile: function(){
        Mercury.util.FileLoader.loadAndDecodeJsonFile('resources/config/configFile.json',null,this.onConfigLoaded,this.onConfigFail,this);
    },

    onConfigLoaded: function(argConfigFileObject){
        AliveTracker.util.VTypesOverrides.init();
        Mercury.Main.init(argConfigFileObject);
    },

    onConfigFail:function () {
        Mercury.core.ErrorsManager.handleFatalError(Mercury.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID);
    }

});
