import query from './sql.js'
import db from '#pg'

async function getVideos({ page, limit, search, sortKey, sortValue }) {
    return await db(
        query.GET_VIDEOS,
        (page - 1) * limit,
        limit,
        search,
        sortKey,
        sortValue
    )
}

async function getVideo({ video_id }) {
    const [video] = await db(query.GET_VIDEO, video_id)
    return video
}

async function VIDEOS() {
    return await db(query.VIDEOS)
}

async function addVideo(user_id, video_name, video_link, video_type, video_date, video_size) {
    const video = await db(query.ADD_VIDEO, user_id, video_name, video_link, video_type, video_date, video_size)
    return video
}

async function updateVideo(video_name, video_id, user_id) {
    const video = await db(query.UPDATE_VIDEO, video_name, video_id, user_id)
    return video
}

async function deleteVideo(video_deleted_at, video_id, user_id) {
    const video = await db(query.DELETE_VIDEO, video_deleted_at, video_id, user_id)
    return video
}


export default {
    getVideos,
    getVideo,
    addVideo,
    deleteVideo,
    updateVideo,
    VIDEOS
}