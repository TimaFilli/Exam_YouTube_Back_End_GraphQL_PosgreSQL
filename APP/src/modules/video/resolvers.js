import { USER_CONFIG } from '#config/index'
import { finished } from 'stream/promises'
import model from './model.js'
import JWT from '#helpers/jwt'
import sha256 from 'sha256'
import path from 'path'
import fs from 'fs'


export default {
    // Mutation: {
    //     update: async (_, { user_name, user_password }, { __, userIp, agent }) => {},

    //     delete: async (_, { video_id }, { __, userIp, agent }) => {},

    //     add: async (_, { user_avatar, user_name, user_password }, { __, agent, userIp }) => {},
    // },

    Query: {
        videos: () => "VIDEOS!"

    //     videos: async (_, { pagination, search, sort }) => {
    //         const sortKey = Object.keys(sort || {})[0]

    //         // return await model.getUsers({
    //         //     page: pagination?.page || USER_CONFIG.PAGINATION.PAGE,
    //         //     limit: pagination?.limit || USER_CONFIG.PAGINATION.LIMIT,
    //         //     sortValue: sort ? sort[sortKey] : null,
    //         //     sortKey,
    //         //     search,
    //         // })
    //     },

    //     video: async (_, args) => {
    //         // return await model.getUser(args)
    //     }
    },

    // Video: {
    //     user_id: global => global.user_id,
    //     video_id: global => global.video_id,
    //     video_name: global => global.user_name,
    //     video_link: global => global.user_link,
    //     video_date: global => global.user_date,
    //     video_size: global => global.user_size
    // }
}