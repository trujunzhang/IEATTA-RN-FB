const _ = require('underscore')
const md5 = require('blueimp-md5')

const Users = {}

/**
 * @summary Check if a user is an admin
 * @param {Object|string} user - The user or their userId
 */
Users.isAdmin = function (user) {
    try {
        return !!user && !!user.isAdmin
    } catch (e) {
        return false // user not logged in
    }
}


export default Users
