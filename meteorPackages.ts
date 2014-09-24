declare module Roles {
    function addUsersToRoles(user: string[], roles: string[]);
    function createRole(user: string);
    function deleteRole(user: string);
    function getAllRoles();
    function getGroupsForUser();
    function getRolesForUser(user: string);
    function getUsersInRole(role: string);
    function removeUsersFromRoles(user: string, roles:string[]);
    function setUserRoles(user: string, roles:string[]);
    function userIsInRole(user: string, roles:any);
}