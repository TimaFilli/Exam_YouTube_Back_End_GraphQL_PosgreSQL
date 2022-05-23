import query from './sql.js'
import db from '#pg'

// async function getUsers({ page, limit, search, sortKey, sortValue }) {
//     return await db(
//         query.GET_USERS,
//         (page - 1) * limit,
//         limit,
//         search,
//         sortKey,
//         sortValue
//     )
// }

// async function getUser({ user_id }) {
//     const [user] = await db(query.GET_USER, user_id)
//     return user
// }

// async function USERS() {
//     return await db(query.USERS)
// }

// async function addUser(user_name, user_password, user_avatar) {
//     const user = await db(query.ADD_USER, user_name, user_password, user_avatar)
//     return user
// }

export default {
    // getUsers,
    // getUser,
    // addUser,
    // USERS
}