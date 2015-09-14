//Create dependencies, express and path objects to be used
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//
app.use(bodyParser.json());
//the route file from index.js
var index = require('./routes/index');
//when a user hits 'localhost:3000/' use index route
app.use('/', index);
//creates a static path to serve our JS files
app.use(express.static(path.join(__dirname, './server/public')));
//listen for traffic
var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});