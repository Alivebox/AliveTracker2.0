Ext.define('AliveTracker.defaults.WebServices',{

    statics: {
        WEB_SERVICE_TYPE: 'restproxy',
        WEB_SERVICES_SERVER: '/ws/alivews/',
        USER_AUTHENTICATION: '/ws/alivews/main/',
        GET_USER_AUTH: '/ws/alivews/main/user/',
        GET_USERS_GROUP: '/ws/alivews/users/group/{0}',
        GROUP_CREATE_GROUP: '/ws/alivews/groups/createGroup/',
        SAVE_GROUP: '/ws/alivews/groups/',
        SAVE_PROJECT: '/ws/alivews/projects/saveProject/{0}',
        DELETE_GROUP: '/ws/alivews/groups/delete/{0}',
        GET_HOME_GROUP: '/ws/alivews/groups/getGroupsByUser/',
        GET_PROJECTS : '/ws/alivews/projects/group/{0}',
        LOG_CREATE_LOGS: '/ws/alivews/logs/',
        EXAMPLE_COMPLEX_URL: 'ws/alivews/projects/group/{0}/user/{1}/',
        GET_USERS_PROJECTS: '/ws/alivews/projects/{0}'
    }

});