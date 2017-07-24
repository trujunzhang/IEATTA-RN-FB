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

    const moment = require('moment')
    //for example: "Saturday, 1 Jul, 12:00 am"
    const day = moment(start).format('dddd, DD MMM, h:mm a')
    // debugger

    return {
        "startFormat": moment(start).format('dddd, DD MMM, h:mm a'),
        "endFormat": moment(end).format('dddd, DD MMM, h:mm a')
    }
}


export default Events;
