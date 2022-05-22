import { GraphQLUpload } from 'graphql-upload'

export default {
    Upload: GraphQLUpload,

    MainType: {
        __resolveType: object => {
            if (object.user_id && object.user_name) return 'User'
            // if (object.video_id && object.video_link) return 'Video'
            else return null
        }
    },

    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    }
}