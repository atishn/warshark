/**
 * Requirements
 */
var express = require('express'),
    map = require('./routes/maps')

/** 
 *	Create app
 */ 
var app = express.createServer();

/**
 * Configuration
 */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

/**
 *	Look for static files in the public folder
 */ 
app.use( express.static(__dirname + '/public') );

app.use ( express.bodyParser());
/**
 * Routes
 */
app.get('/', function(req, res, next) {
	res.render('index');
});

app.get('/home', function(req, res, next) {

	var games = require('./public/mock/game-list.json');
	
	res.render('home', {
		games: games
	});
});

app.get('/game/:id', function(req, res, next) {
	res.render('game', {
		id: req.params.id
	});
});

app.get('/mapmaker', function(req, res, next) {
	res.render('map-maker');
});

app.get('/api/map/:name', map.findByName);
app.post('/api/map', map.addMap)

// handle everything else that a route can't be found for
app.get('*', function(req, res){
	res.render('error');
});

/**
 * Listen
 */
app.listen(3000);