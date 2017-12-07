
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure PORT
var port = process.env.PORT || 3000; // set our port

// configure mongoose
var mongoose   = require('mongoose');
var mongoBaseUrl = 'mongodb://localhost'; //this is default if you are running locally, if u still get an error, try 127.0.0.1 in the place of 'localhost'
var mongoPort = ':27017';  //modify the path to your needs. Dont change if you didnt change the default port of mongodb running.
var mongoPath = '/docs'; 
var mongoFinalUrl = mongoBaseUrl + mongoPort + mongoPath;

mongoose.connect(mongoFinalUrl, function(err) {
    if (err) {
	console.log("Not connected to mongodb at " + mongoFinalUrl);
	throw err;
    }
}); 

const router = require('./app/routes/api');

app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api', router);

app.listen(port);
console.log('Server started ' + port);
