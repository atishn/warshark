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
        {seqId: Number,
            nodeCount: {type: Number, default: 0},
            user: { type: Schema.ObjectId, ref: 'User' }
        }
    ],
    currentUser: { type: Schema.ObjectId, ref: 'User'},
    movesLeft: Number,
    status: { type: String, enum: ['New', 'InProgress', 'End'], default: 'New' },
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
            .populate('users.user', 'name')
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
            .populate('users.user', 'name')
            .sort({'createdAt': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },

    subscribeUser: function (game, userid) {

        var userEntry = userEntry || {}

        userEntry.seqId = game.users.length + 1;
        userEntry.user = userid;

        game.users.addToSet(userEntry);

        // Updating reference to UserGame
        var UserGame = mongoose.model('UserGame')

        UserGame
            .findOne({_id: userid})
            .exec(function (err, userGame) {
                if (err) return
                if (!userGame) {
                    userGame = new UserGame();
                    userGame.user = userid;
                }
                userGame.game.addToSet(game._id)
                userGame.save()
            })
    },

    // TODO : This functionality is broken. need to implement properly.
    unsubscribeUser: function (game, userid) {

        var foundMatch = false;

        for (var i = 0; i < game.users.length; i++) {
            var userEntry = game.users[i];
            if (userEntry.user._id == userid) {
                game.users.pull(userEntry);
                foundMatch = true;
            }
            if (foundMatch && i < game.users.length) {
                userEntry = game.users[i];
                userEntry.seqId = userEntry.seqId - 1;    // Shift the seqId by -1
            }
        }

        //game.users.pull(userid);

        var UserGame = mongoose.model('UserGame')

        // Updating reference to UserGame
        UserGame
            .findOne({_id: userid})
            .exec(function (err, userGame) {
                if (err) return
                if (!userGame) return
                userGame.game.pull(game._id)
                userGame.save();
            })
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
