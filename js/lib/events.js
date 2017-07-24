const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const Events = {}

/**
 * format is "Saturday, 1 Jul, 12:00 am – Monday, 31 Jul, 12:00 am"
 * @param item
 */
Events.getDateInfo = function (item) {
    const start = item.start;
    const end = item.end;

    //for example: "Saturday, 1 Jul, 12:00 am"
    const day = moment(start).format('dddd DD-MM-YYYY');

    debugger

    return {
        "startFormat": "",
        "endFormat": ""
    }
}


export default Events;
