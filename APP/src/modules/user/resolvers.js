import { USER_CONFIG } from '#config/index'
import { finished } from 'stream/promises'
import model from './model.js'
import JWT from '#helpers/jwt'
import sha256 from 'sha256'
import path from 'path'
import fs from 'fs'


export default {
    Mutation: {
        login: async (_, { user_name, user_password }, { __, userIp, agent }) => {
            user_name = user_name.trim()
            user_password = user_password.trim()

            let users = await model.USERS()
            let user = users.find(user => user.user_name == user_name && user.user_password == sha256(user_password))

            if (!user) throw new Error("Invalid user_name or user_password!")

            const token = JWT.sign({
                user_id: user.user_id,
                userIp,
                agent,
            })

            delete user.user_password

            return {
                status: 200,
                message: "The user successfully logged in!",
                data: user,
                token
            }
        },

        register: async (_, { user_avatar, user_name, user_password }, { __, agent, userIp }) => {
            const { createReadStream, filename } = await user_avatar

            user_avatar = Date.now() + filename.replace(/\s/g, '')
            user_name = user_name.trim()
            user_password = user_password.trim()

            let users = await model.USERS()
            let user = users.find(user => user.user_name == user_name)

            if (user) throw new Error("The user already exists!")

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', user_avatar))
            createReadStream().pipe(out)
            await finished(out)

            model.addUser(user_name, sha256(user_password), user_avatar)

            let newUser = await model.USERS()
            newUser = newUser.find(user => user.user_name == user_name)

            let token = JWT.sign({
                user_id: newUser.user_id,
                userIp,
                agent,
            })

            delete newUser.user_password

            return {
                status: 200,
                message: "The user successfully registered!",
                data: newUser,
                token
            }
        }
    },

    Query: {
        users: async (_, { pagination, search, sort }) => {
            const sortKey = Object.keys(sort || {})[0]

            return await model.getUsers({
                page: pagination?.page || USER_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || USER_CONFIG.PAGINATION.LIMIT,
                sortValue: sort ? sort[sortKey] : null,
                sortKey,
                search,
            })
        },

        user: async (_, args) => {
            return await model.getUser(args)
        }
    }
}