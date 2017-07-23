import Telescope from './settings'
import moment from 'moment'

const Photos = {}

Photos.getMedia = function (photo) {
    return photos.results.map((item, index) => {
        return {
            photo: `file://${getLocalImagePath(item.objectId, PARSE_ORIGINAL_IMAGES)}`,
            // caption: 'Grotto of the Madonna',
        }
    })
}

export default Photos
