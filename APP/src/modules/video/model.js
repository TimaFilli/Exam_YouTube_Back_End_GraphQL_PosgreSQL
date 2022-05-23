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


export default {
    getVideos,
    getVideo,
    addVideo,
    VIDEOS
}