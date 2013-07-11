/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var MapSchema = new Schema({
    name: String
 })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length
}

// the below 4 validations only apply

// the below 4 validations only apply

MapSchema.path('name').validate(function (name) {
    return name.length > 0
}, 'Name cannot be blank')


/**
 * Statics
 */

MapSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
            .populate('user', 'name')
            .sort({'createdAt': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}


/**
 * Pre-save hook
 */

MapSchema.pre('save', function (next) {
    next()
})

mongoose.model('Map', MapSchema)
