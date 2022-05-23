const GET_VIDEOS = `
    select 
        user_id,
        video_id,
        video_name,
        video_type,
        video_link,
        video_date,
        video_size,
        video_created_at
    from videos
    where 
    video_deleted_at IS NULL and
        video_name ilike concat('%', $3::varchar, '%')
    order by
    case 
        when $4 = 'byDate' and $5 = 1 then video_created_at
    end asc,
    case 
        when $4 = 'byDate' and $5 = 2 then video_created_at
    end desc,
    case 
        when $4 = 'byName' and $5 = 1 then video_name
    end desc,
    case 
        when $4 = 'byName' and $5 = 2 then video_name
    end asc
    offset $1 limit $2
`

const GET_VIDEO = `
    select 
        user_id,
        video_id,
        video_name,
        video_type,
        video_link,
        video_date,
        video_size,
        video_created_at
    from videos
    where video_id::varchar = $1 and video_deleted_at IS NULL
`

const VIDEOS = `
    select 
        user_id,
        video_id,
        video_name,
        video_type,
        video_link,
        video_date,
        video_size,
        video_created_at
    from videos
        WHERE video_deleted_at IS NULL
`

const ADD_VIDEO = `
    insert into videos (user_id, video_name, video_link, video_type, video_date, video_size) values ($1, $2, $3, $4, $5, $6) returning *
`

const UPDATE_VIDEO = `
    update videos set video_name = $1 where video_id = $2 and user_id = $3 returning *
`

const DELETE_VIDEO = `
    update videos set video_deleted_at = $1 where video_id = $2 and user_id = $3 returning *
`

export default {
    GET_VIDEOS,
    GET_VIDEO,
    ADD_VIDEO,
    DELETE_VIDEO,
    UPDATE_VIDEO,
    VIDEOS
}