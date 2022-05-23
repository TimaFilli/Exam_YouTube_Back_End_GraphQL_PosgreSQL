import { VIDEO_CONFIG } from '#config/index'
import { finished } from 'stream/promises'
import model from './model.js'
import JWT from '#helpers/jwt'
import sha256 from 'sha256'
import path from 'path'
import fs from 'fs'


export default {
    Mutation: {
        addVideo: async (_, { video_name, video_file }, { __, userIp, agent }) => {
            console.log("ADD VIDEO");
            console.log(video_name);
            console.log(video_file);
        },

        updateVideo: async (_, { video_id, video_name }, { __, userIp, agent }) => {
            console.log("UPDATE VIDEO");
            console.log(video_id);
            console.log(video_name);
        },

        deleteVideo: async (_, { video_id }, { __, agent, userIp }) => {
            console.log("DELETE VIDEO");
            console.log(video_id);
        },
    },

    Query: {
        videos: async (_, { pagination, search, sort }) => {
            const sortKey = Object.keys(sort || {})[0]
            console.log("GET VIDEOS");

            return await model.getVideos({
                page: pagination?.page || VIDEO_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || VIDEO_CONFIG.PAGINATION.LIMIT,
                sortValue: sort ? sort[sortKey] : null,
                sortKey,
                search,
            })
        },

        video: async (_, args) => {
            console.log("GET VIDEO");

            return await model.getVideo(args)
        }
    }
}