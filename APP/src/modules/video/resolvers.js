import { VIDEO_CONFIG } from '#config/index'
import { finished } from 'stream/promises'
import model from './model.js'
import path from 'path'
import fs from 'fs'

export default {
    Mutation: {
        addVideo: async (_, { video_name, video_file }, { __, userIp, agent, user_id }) => {
            const { createReadStream, filename, mimetype } = await video_file

            video_file = Date.now() + filename.replace(/\s/g, '')
            video_name = video_name.trim()

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', 'videos', video_file))
            createReadStream().pipe(out)
            await finished(out)

            const video_date = new Date()
            const video_size = out.bytesWritten / 1000 + ""

            let newVideo = await model.addVideo(user_id, video_name, video_file, mimetype, video_date, video_size)

            return {
                status: 200,
                message: "The video successfully added!",
                data: newVideo[0]
            }
        },

        updateVideo: async (_, { video_id, video_name }, { __, userIp, agent, user_id }) => {
            const updatedVideo = await model.updateVideo(video_name, video_id, user_id)
            return {
                status: 200,
                message: "The video successfully updated!",
                data: updatedVideo[0]
            }
        },

        deleteVideo: async (_, { video_id }, { __, agent, userIp, user_id }) => {
            let video_deleted_at = new Date()
            const deletedVideo = await model.deleteVideo(video_deleted_at, video_id, user_id)
            return {
                status: 200,
                message: "The video successfully deleted!",
                data: deletedVideo[0]
            }
        },
    },

    Query: {
        videos: async (_, { pagination, search, sort }) => {
            const sortKey = Object.keys(sort || {})[0]
            return await model.getVideos({
                page: pagination?.page || VIDEO_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || VIDEO_CONFIG.PAGINATION.LIMIT,
                sortValue: sort ? sort[sortKey] : null,
                sortKey,
                search,
            })
        },

        video: async (_, args) => {
            return await model.getVideo(args)
        }
    }
}