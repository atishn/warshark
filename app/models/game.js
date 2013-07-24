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
    name: String,
    mapId: { type: Schema.ObjectId, ref: 'Map' },
    nodesState: [
        { type: Schema.ObjectId, ref: 'NodeState' }
    ],
    users: [
        { type: Schema.ObjectId, ref: 'User' }
    ],
    currentUser: { type: Schema.ObjectId, ref: 'User'},
    status: { type: String, enum:['Start', 'InProgress', 'End'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, value: Date.now }

})

mongoose.model('Game', GameSchema)

/**
 * Pre-save hook
 */

GameSchema.pre('save', function (next) {
    this.updatedAt = Date.now
    next()
})


//
//BoardStatus{
//    id : (Unique to each game)
//    boardTypeId:[ Id of BoardType. Eg. America Map, World Map, Box View Map]
//    nodesState:[Array of nodesState object]
//    users:[Array of Users Object]
//    currentUser:
//        status:(New, In Progress, Finished)
//    createdAt:
//        updatedAt:
//            }
