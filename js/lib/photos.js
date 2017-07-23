import Telescope from './settings'
import moment from 'moment'

const {getLocalImagePath} = require('../parse/fsApi')


/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../lib/constants').default


const Photos = {}

Photos.getMedia = function (photos) {
    return photos.map((item, index) => {
        return {
            photo: `file://${getLocalImagePath(item.objectId, PARSE_ORIGINAL_IMAGES)}`,
            // caption: 'Grotto of the Madonna',
        }
    })
}

export default Photos
