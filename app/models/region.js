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
    nodeCount: Number
})

mongoose.model('Region', RegionSchema)



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
