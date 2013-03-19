Ext.define('AliveTracker.defaults.WebServices',{

    statics: {
        WEB_SERVICE_TYPE: 'restproxy',
        WEB_SERVICES_SERVER: '/ws/alivews/',
        USER_AUTHENTICATION: '/ws/alivews/main/',
        GET_USER_AUTH: '/ws/alivews/main/user/',
        GET_USERS_GROUP: '/ws/alivews/users/group/{0}',
        GROUP_CREATE_GROUP: '/ws/alivews/groups/createGroup/',
        SAVE_GROUP: '/ws/alivews/groups/',
        DELETE_GROUP: '/ws/alivews/groups/delete/{0}',
        GET_HOME_GROUP: '/ws/alivews/groups/getGroupsByUser/',
        GET_PROJECTS : '/ws/alivews/projects/group/{0}',
        GET_LOGS_USER_GROUP_DATE: '/ws/alivews/logs/group/{0}',
        GET_USERS_PROJECTS: '/ws/alivews/projects/{0}'
    }

});