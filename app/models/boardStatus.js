/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var BoardStatusSchema = new Schema({
    name: String,
    boardTypeId: { type: Schema.ObjectId, ref: 'BoardType' },
    nodesState:[{ type: Schema.ObjectId, ref: 'NodeStatus' }],
    users:[{ type: Schema.ObjectId, ref: 'User' }],
    currentUser:{ type: Schema.ObjectId, ref: 'User'},
    status:String,
    createdAt:{ type: Date, default: Date.now },
    updatedAt:{ type: Date, value: Date.now }

})

mongoose.model('BoardStatus', BoardStatusSchema)


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
