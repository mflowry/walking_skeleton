//Node declarations: declare all our dependencies with "require" statements
//Create express, mongoose, and path objects to be used later
var express = require('express');//extends Node's http functionality
//create a router obj (declare that this page is a router) using the router method of the Express obj initialized on prev line
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

//connect to Mongo DB using the specified path; tells it where to make the db
mongoose.connect('mongodb://localhost/basic_walking_skeleton');

//make a schema/model for data; defines what the cat object looks like
var Cat = mongoose.model('Cat', { name: String });

//get route for the index page '/'; handles get requests to index page
router.get('/', function(req,res,next){//pass in req and res to make avail to the callback function; next go to next middleware
    //use path to create a stable path to index.html and send the file; dirname is where we are, views/index.html is where we need to go
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

//get route for cats list; /cats is an api path (localhost:3000/cats)
router.get('/cats',function(req,res,next){
    //find all items ({}) in the db and then execute the following function; query results available as 'cats'
    return Cat.find({}).exec(function(err, cats){//find is a mongoose method, Cat is the model mongoose searches on
        //throw error if error
        if(err) {
            throw err;
        } else{
            //cats is an array of JS objects, turn it into JSON by stringifying; res.JSON is an equivalent method
            res.send(JSON.stringify(cats));
            //calls the next middleware
            next();
        }
    });
});
//post route on localhost:3000/add;
router.post('/add', function(req,res,next){
    //logs in server console
    console.log('/add');
    //make a new Cat using the req.body.name as value for name key; store as kitty
    var kitty = new Cat({ name: req.body.name });
    //kitty inherits save method from Cat; save is a prototypical method of mongoose model
    kitty.save(function(err){
        //error handlint
        if (err){
            console.log(err);
        } else{
            //client console message along with what kitty.toJSON looks like; toJSON extracts the data from the kitty mongoose obj
            console.log('Sending:', kitty.toJSON);
            //toJSON extracts the data from the kitty mongoose obj and sends it as a response
            res.send(kitty.toJSON());
            next();
        }
    });
});
//makes router available to the app.js
module.exports = router;