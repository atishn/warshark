/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var GameSchema = new Schema({
    name: {type: String, unique: true},
    mapId: { type: Schema.ObjectId, ref: 'Map' },
    nodesState: [
        { type: Schema.ObjectId, ref: 'NodeState' }
    ],
    users: [
        { type: Schema.ObjectId, ref: 'User' }
    ],
    currentUser: { type: Schema.ObjectId, ref: 'User'},
    status: { type: String, enum: ['New', 'InProgress', 'End'], default:'New' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, value: Date.now }

})

GameSchema.statics = {
    /**
     * Find Game by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function (id, cb) {
        this.findOne({ _id: id })
            .populate('users', 'name')
            .populate('nodesState')

            .exec(cb)
    },

    /**
     * List Games
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

GameSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

mongoose.model('Game', GameSchema)
