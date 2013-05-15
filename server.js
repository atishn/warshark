/**
 * Requirements
 */
var express = require('express');

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

// handle everything else that a route can't be found for
app.get('*', function(req, res){
	res.render('error');
});

/**
 * Listen
 */
app.listen(3000);