/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var NodeStateSchema = new Schema({
    name: String,
    nodeId: { type: Schema.ObjectId, ref: 'Node' },
    ownerId: { type: Schema.ObjectId, ref: 'User' },
    currentUnits: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, value: Date.now }

})

/**
 * Pre-save hook
 */

NodeStateSchema.pre('save', function (next) {
    this.updatedAt = Date.now
    next()
})


mongoose.model('NodeState', NodeStateSchema)
