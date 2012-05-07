/**
 *  Author: Quirijn Groot Bluemink
 */

var express = require('express'), routes = require('./routes'), admin = require('./routes/admin');

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/admin', admin.index);
app.post('/admin/addUser', admin.create);
app.post('/admin/removeUser', admin.remove);
app.post('/update', routes.update);

app.listen(5000, function() {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
