/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var BoardGroupSchema = new Schema({
    name: String,
    color: String,
    boardTypeId: { type: Schema.ObjectId, ref: 'BoardType' },
    nodeCount: Number
})

mongoose.model('BoardGroup', BoardGroupSchema)



//
//BoardGroup{
//    id:
//        name:
//            color:
//                boardTypeId:
//                    nodeids:[array of nodeIds belongs to this group]
//    numberOfnodes:(Count of nodes)
//}
//
//
