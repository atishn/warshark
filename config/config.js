
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://anarlawar:queen@linus.mongohq.com:10019/atishhost',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
      facebook: {
          clientID: "183533091812513",
          clientSecret: "4a50e04a3d5b26c2492e4aa59857ef8d",
          callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
          clientID: "Do109m6NxpOzAC6a7xKiww",
          clientSecret: "BfQm7WoIvnW2CQ1cEIATXQ1236aUhSSSqsPmaSxUM",
          callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
          clientID: '4e475aa4cb5f8619d7cf',
          clientSecret: 'a2d00b31659a4638ce41f97d1fb63e79fcd5a9ac',
          callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
          clientID: "929625802695.apps.googleusercontent.com",
          clientSecret: "TiBd4LiEtAE2p2bRkxAl8m6Y",
          callbackURL: "http://localhost:3000/auth/google/callback"
      }
  },
  test: {
    db: 'mongodb://anarlawar:queen@linus.mongohq.com:10019/atishhost',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
      facebook: {
          clientID: "183533091812513",
          clientSecret: "4a50e04a3d5b26c2492e4aa59857ef8d",
          callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
          clientID: "Do109m6NxpOzAC6a7xKiww",
          clientSecret: "BfQm7WoIvnW2CQ1cEIATXQ1236aUhSSSqsPmaSxUM",
          callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
          clientID: '4e475aa4cb5f8619d7cf',
          clientSecret: 'a2d00b31659a4638ce41f97d1fb63e79fcd5a9ac',
          callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
          clientID: "929625802695.apps.googleusercontent.com",
          clientSecret: "TiBd4LiEtAE2p2bRkxAl8m6Y",
          callbackURL: "http://localhost:3000/auth/google/callback"
      }
  },
  production: {}
}
