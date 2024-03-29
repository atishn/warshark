/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var RegionSchema = new Schema({
    name: String,
    color: String,
    unitBonus: Number,
    nodeCount: Number,
    node: [
        { type: Schema.ObjectId, ref: 'Node' }
    ]
})

exports.RegionSchema = RegionSchema;


var validatePresenceOf = function (value) {
    return value && value.length
}

// the below 4 validations only apply

// the below 4 validations only apply

RegionSchema.path('name').validate(function (name) {
    return name.length > 0
}, 'Name cannot be blank')


RegionSchema.path('unitBonus').validate(function (unitBonus) {
    return unitBonus != null
}, 'unit Bonus cannot be blank')

RegionSchema.pre('init', function (next, data) {
    data.nodeCount = data.node ? data.node.length : 0;
    next();
});

/**
 * Statics
 */

RegionSchema.statics = {


    /**
     * Find Region by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function (id, cb) {
        this.findOne({ _id: id })
            .populate('node')
            .exec(cb)
    },

    /**
     * List Regions
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
            .sort({'createdAt': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}
mongoose.model('Region', RegionSchema)
