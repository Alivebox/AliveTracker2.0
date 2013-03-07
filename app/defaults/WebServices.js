Ext.define('AliveTracker.defaults.WebServices',{

    statics: {
        WEB_SERVICE_TYPE: 'restproxy',
        WEB_SERVICES_SERVER: '/ws/alivews/',
        USER_AUTHENTICATION: '/ws/alivews/main/',
        GROUP_MY_GROUPS: '/ws/alivews/groups/retrieveMyGroups/',
        GROUP_GROUPS_I_BELONG: '/ws/alivews/groups/retrieveGroupsIBelongTo/',
        GROUP_CREATE_GROUP: '/ws/alivews/groups/createGroup/',
        GET_PROJECTS : '/ws/alivews/projects/group/',
        GROUP_ID: 0
    }

});