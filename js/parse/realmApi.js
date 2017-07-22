'use strict'

const repository = require('../parse/realmObjects').default
console.log(repository.path)

const Records = require('../lib/records').default

/**
 * The states were interested in
 */
const {
    PARSE_CONFIGURE,
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
} = require('../lib/constants').default


function writeParseRecord(record) {
    const object = record[record.recordType]
    // debugger
    const {parseObject, realmSchema} = Records.realmObjects[record.recordType]

    if (repository.objects(parseObject).filtered('objectId == $0', object.id).length) return // Exist

    repository.write(() => {
        repository.create(parseObject, Records.getRealmData(parseObject, object))
    })
}

const ConfigureService = {
    getLastRecordUpdatedAt: function () {
        let array = repository.objects(PARSE_CONFIGURE)
        if (array.length) {
            return array[0].lastRecordUpdatedAt
        }

        return null
    },

    saveLastRecordUpdatedAt: function (recorderUpdatedAt) {
        let array = repository.objects(PARSE_CONFIGURE)
        if (array.length) {// update
            repository.write(() => {
                array[0].lastRecordUpdatedAt = recorderUpdatedAt;
            })
        } else {// new configure, then create it.
            repository.write(() => {
                repository.create(PARSE_CONFIGURE, {
                    objectId: 'c001',
                    lastRecordUpdatedAt: recorderUpdatedAt
                })
            })
        }

        return null
    }
}

const RestaurantService = {
    findAll: function (sortBy) {
        return repository.objects(PARSE_RESTAURANTS)
    },

    save: function (item) {
        if (repository.objects(PARSE_RESTAURANTS).filtered('objectId == $0', item.id).length) return;
        repository.write(() => {
            repository.create(PARSE_RESTAURANTS, Records.getRealmData(PARSE_RESTAURANTS, item))
        })
    },

    updateImageUri: function (item, localPhotoStatus, callback) {
        if (!callback) return;
        repository.write(() => {
            callback();
            item.localPhotoStatus = localPhotoStatus;
        })
    },

    update: function (item, callback) {
        if (!callback) return;
        repository.write(() => {
            callback();
            item.updatedAt = new Date();
        })
    }
}

const EventService = {
    findAll: function (sortBy) {
        return repository.objects(PARSE_EVENTS)
    },

    save: function (item) {
        if (repository.objects(PARSE_EVENTS).filtered('objectId == $0', item.id).length) return;
        repository.write(() => {
            repository.create(PARSE_EVENTS, Records.getRealmData(PARSE_EVENTS, item))
        })
    },

    update: function (item, callback) {
        if (!callback) return;
        repository.write(() => {
            callback();
            item.updatedAt = new Date();
        })
    }
}


const PhotoService = {
    findAll: function (sortBy) {
        return repository.objects(PARSE_PHOTOS)
    },

    save: function (item) {
        if (repository.objects(PARSE_PHOTOS).filtered('objectId == $0', item.id).length) return;
        repository.write(() => {
            repository.create(PARSE_PHOTOS, Records.getRealmData(PARSE_PHOTOS, item))
        })
    },

    update: function (item, callback) {
        if (!callback) return;
        repository.write(() => {
            callback();
            item.updatedAt = new Date();
        })
    }
}


export default {
    writeParseRecord,
    ConfigureService,
    RestaurantService,
    EventService,
    PhotoService,
}