/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , ModelMapper = require('../modelMapper.js')
    , UserGame = mongoose.model('UserGame')


exports.signin = function (req, res) {
}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
    res.redirect('/home')
}

/**
 * Show login form
 */

exports.login = function (req, res) {
    res.render('users/login', {
        title: 'Login',
        message: req.flash('error')
    })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    })
}

/**
 * Logout
 */

exports.logout = function (req, res) {
    req.logout()
    res.redirect('/login')
}

/**
 * Session
 */

exports.session = function (req, res) {
    res.redirect('/')
}

/**
 * Create user
 */

exports.create = function (req, res) {
    var user = new User(req.body)
    user.provider = 'local'
    user.save(function (err) {
        if (err) {
            return res.render('users/signup', { errors: err.errors, user: user })
        }
        req.logIn(user, function (err) {
            if (err) return next(err)
            return res.redirect('/')
        })
    })
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
    var user = req.user
    res.render('users/show', {
        title: user.name,
        user: user
    })
}


/**
 * List of user.  Added for testing. Will remove sooner
 * @param req
 * @param res
 */

exports.index = function (req, res) {
    var page = req.param('page') > 0 ? req.param('page') : 0
    var perPage = 15
    var options = {
        perPage: perPage,
        page: page
    }

    var criteria = options.criteria || {}

    User.find(criteria)
        .sort({'createdAt': -1}) // sort by date
        .limit(options.perPage)
        .skip(options.perPage * options.page)
        .exec(function (err, users) {
            if (err) return res.render('500');

            var responseUsers = []
            for (var i = 0; i < users.length; i++) {
                responseUsers.push(ModelMapper.userResponse(users[i]));
            }
            res.send(responseUsers);
        })
}


/**
 *  Get games subscribed to users
 */

exports.getSubscribedGames = function (req, res) {
    var user = req.user
    UserGame.findByUserid(user._id, function (err, usergame) {
        if (err) return new Error(err)
        if (!usergame) res.send(404)
        else res.send(200, usergame.game)
        //res.send(usergame.game);
    })

}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
    User
        .findOne({ _id: id })
        .exec(function (err, user) {
            if (err) return next(err)
            if (!user) return next(new Error('Failed to load User ' + id))
            req.user = user
            next()
        })
}

