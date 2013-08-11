/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/**
 * Sequence Schema. Used for auto-incremented number sequences (UserId, PaintingId, etc)
 */

//TODO: before migration we'll need to set the initial sequence values at 100000 so we don't clash with existing IDs (default below didn't work)

var SequenceSchema = new Schema({
    _id: String,
    next: {type: Number, default: 1}
});

/**
 * Statics
 */

SequenceSchema.statics.increment = function (sequence, callback) {
    return this.findByIdAndUpdate(sequence, { $inc: { next: 1 } }, {new: true, upsert: true, select: {next: 1}}, callback);
};

mongoose.model('Sequence', SequenceSchema);
