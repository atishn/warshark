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

NodeStateSchema.statics = {

    create: function (user, node, cb) {

        var NodeState = mongoose.model('NodeState')
        nodeState = new NodeState();

        nodeState.nodeId = node._id;
        nodeState.currentUnits = node.units;
        nodeState.ownerId = user._id;
        nodeState.save(cb)
    }
}
/**
 * Pre-save hook
 */

NodeStateSchema.pre('save', function (next) {
    this.updatedAt = Date.now
    next()
})


mongoose.model('NodeState', NodeStateSchema)
