var S = require('string')

exports.userResponse = function (user) {
    return {
        Id: user._id, Email: user.email, Name: user.name, Created: user.createdAt
    };
}

exports.errorResponse = function (error, code) {
    return {
        Error: error, Errorcode: code
    };
}
