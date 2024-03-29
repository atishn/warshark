/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var UserGameSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    game: [
        { type: Schema.ObjectId, ref: 'Game' }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, value: Date.now }

})

/**
 * Pre-save hook
 */

UserGameSchema.pre('save', function (next) {
    this.updatedAt = Date.now
    next()
})

UserGameSchema.statics = {

    /**
     * Find UserGame by userid
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    findByUserid: function (id, cb) {

        this.findOne({ user: id })
            .populate('game', 'name status')
            .exec(cb)
    }
}

mongoose.model('UserGame', UserGameSchema)

