/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')

/**
 * User Schema
 */

var BoardTypeSchema = new Schema({
    name: String,
    groupId: [{ type: Schema.ObjectId, ref: 'BoardType' }]
})


mongoose.model('BoardType', BoardTypeSchema)



//
//
//BoardType{
//    id:
//        name:
//            groups:[Array of boardGroups(Each group of different color.... Continents in World Map, Regions in US Map) which belongs to boardType]
//    nodes:[Array of nodes which belongs to boardType]
//}



