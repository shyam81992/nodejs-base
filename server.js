cluster = require('cluster');
var num_processes = require('os').cpus().length;
var net = require('net');
process.env.NODE_ENV = "local_machine";
var config = require("./config/config.js").getConfig();
if (cluster.isMaster) {
  // This stores our workers. We need to keep them to be able to reference
    // them based on source IP address. It's also useful for auto-restart,
    // for example.
    var workers = [];

    // Helper function for spawning worker at index 'i'.
    var spawn = function(i) {
    	var env = {workerId: i};
	 	workers[i] = cluster.fork(env);
	 	workers[i].process.env = env;

        // Optional: Restart worker on exit
        workers[i].on('exit', function(worker, code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });
    };

    // Spawn workers.
    for (var i = 0; i < num_processes; i++) {
        spawn(i);
    }

    // Helper function for getting a worker index based on IP address.
    // This is a hot path so it should be really fast. The way it works
    // is by converting the IP address to a number by removing the dots,
    // then compressing it to the number of slots we have.
    //
    // Compared against "real" hashing (from the sticky-session code) and
    // "real" IP number conversion, this function is on par in terms of
    // worker index distribution only much faster.
    var worker_index = function(ip, len) {
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (ip[i] !== '.') {
                s += ip[i];
            }
        }

        return Number(s) % len;
    };

    // Create the outside facing server listening on our port.
    var server = net.createServer({ pauseOnConnect: true }, function(connection) {
        // We received a connection and need to pass it to the appropriate
        // worker. Get the worker for this connection's source IP and pass
        // it the connection.
        var worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send('sticky-session:connection', connection);
    }).listen(config.port);
} else {

		express = module.exports = require('express');
		app = module.exports = express();
		var bodyParser     = require('body-parser');
		var session = require('express-session');
		var MongoDBStore = require('connect-mongodb-session')(session);
		var mongoose       = require('mongoose');
		var fs = require('fs');
		var morgan = require('morgan');
		var errorHandler = require('./common/errorHandler.js');
		var helmet = require('helmet');
		app.use(bodyParser.urlencoded({
		  extended: true
		}));
		app.use(bodyParser.json());
		app.disable('x-powered-by');
		app.use(helmet());
		app.use(helmet.frameguard('sameorigin'));
		app.use(helmet.noCache());
		app.use(helmet.frameguard());
		var path = module.exports = require("path"); 
		app.locals.config = config;
		/* Protected by password checking - All routes */
		if(config.all_route_protected){
		  var basicAuth = require('basic-auth-connect');
		  app.use(basicAuth(config.all_route_username, config.all_route_password));
		 } 
		 //session storage configuration
		 var store = new MongoDBStore(
		      { 
		        uri: app.locals.config.mongoDB_path,
		        collection: 'mySessions'
		      });

		 store.on('error', function(error) {
		      assert.ifError(error);
		      assert.ok(false);
		    });     
		app.use(session({ secret: 'SECRET',resave: true, saveUninitialized: false ,store: store}));
		// mongodb
		mongoose.connect(app.locals.config.mongoDB_path);
		// loging req info
		var accessLogStream = fs.createWriteStream(__dirname + '/logs/access_log.log', {flags: 'a'});
		app.use(morgan('combined', {stream: accessLogStream}));
		// public folder contains html css and images
		app.set('views', __dirname + '/public/views');
		app.engine('html', require('swig').renderFile);
		app.set('view engine', 'html');
		app.use(express.static('public'));
		//route 
		require("./routes/index.js");
		/*
		* Exception Handling
		* Please do not write any code after this. Make this middleware as last statements in this file.
		*/
		app.use(errorHandler.logErrors);
		app.use(errorHandler.sendMail);
		app.use(errorHandler.handleError);

		var server=app.listen(0,'localhost',function(){
		  console.log('I am running on Port: '+config.port);
		});


		// io = require('socket.io')(server);
		// var redis = require('socket.io-redis');
		// io.adapter(redis({ host: 'localhost', port: 6379 }));
		// require('./socket.js')

		process.on('message', function(message, connection) {
	        if (message !== 'sticky-session:connection') {
	            return;
	        }

	        // Emulate a connection event on the server by emitting the
	        // event with the connection the master sent us.
	        server.emit('connection', connection);
			connection.resume();
    	});
		//testing
		//Secong testng comment
}		