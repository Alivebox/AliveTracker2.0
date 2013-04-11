Ext.define('AliveTracker.defaults.WebServices',{

    statics: {
        WEB_SERVICES_SERVER: '/ws/alivews/',
        USER_AUTHENTICATION: '/ws/alivews/main/',
        GET_USER_AUTH: '/ws/alivews/main/user/',
        GET_USERS_GROUP: '/ws/alivews/users/group/{0}',
        GET_USERS_GROUP_AND_PROJECT: '/ws/alivews/main/user/group/{0}/project/{1}',
        GET_ALL_USERS: '/ws/alivews/main/users/{0}',
        GROUP_CREATE_GROUP: '/ws/alivews/groups/createGroup/',
        SAVE_GROUP: '/ws/alivews/groups/',
        UPDATE_GROUP_USER: '/ws/alivews/groups/updateUser/',
        SAVE_PROJECT: '/ws/alivews/projects/saveProject/{0}',
        DELETE_GROUP: '/ws/alivews/groups/delete/{0}',
        GET_HOME_GROUP: '/ws/alivews/groups/getGroupsByUser/',
        GET_PROJECTS : '/ws/alivews/projects/group/{0}',
        GET_LOGS_USER_GROUP_DATE: '/ws/alivews/logs/group/{0}/?{1}',
        LOG_CREATE_LOGS: '/ws/alivews/logs/',
        GET_USERS_PROJECTS: '/ws/alivews/projects/{0}',
        GET_ROLES: '/ws/alivews/roles/',
        DELETE_PROJECT: '/ws/alivews/projects/deleteProject/{0}',
        DELETE_USER: '/ws/alivews/main/users/delete/{0}/group/{1}',
        LOG_EXPORT_REPORT: '/ws/alivews/logs/exportReport/'
    }
});