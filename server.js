var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


// web listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
   console.log('Server listening on port ' + app.get('port'));
});

// database config
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/db', {
      useNewUrlParser: true
   },
   function(error) {
      if (error) {
         return console.error('Unable to connect:', error);
      }
   });
//, {useMongoClient: true});
mongoose.set('useCreateIndex', true);

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: false
}));

// configure the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// configure sessions
app.use(session({
   genid: function(request) {
      return uuid();
   },
   resave: false,
   saveUninitialized: false,
   // cookie: {secure: true},
   secret: 'apollo slackware prepositional expectations'
}));



// database schemas
var db = mongoose.connection;
var Schema = mongoose.Schema;


var registrationSchema = new Schema({
  Firstname:String,
  Email:{type:String, unique:true },
  Password:String

}, {
   collection: 'reg'
});
var users = mongoose.model('reg', registrationSchema);

// routes

app.get('/', function(request, response) {
   username = request.session.username;
   response.render('main', {
      title: 'main',
      description: 'This is the main page',
      username: username
   });
});

app.get('/Home', function(request, response) {
   username = request.session.username;
   response.render('Home', {
      title: 'Home',
      description: 'This is the main page',
      username: username
   });
});



app.get('/main',function(request,response){
    response.render('main', {
        title: 'main',
        description: 'login page'
     });
});

app.post('/Home',function(request,response){
    console.log("a");
    var user=request.body.username;
    var pass=request.body.password;
    if(user=="" || pass== ""){
        console.log("b");
    }
    else{
        console.log("c");
        users.find({Email: user}).then(function(results) {
		    if(results.length > 0){
                response.render('Home');
			   
            } 
            else {
                console.log("d");
                
		    }
	});
}
});



app.get('/Reg', function(request, response) {
   username = request.session.username;
   response.render('Reg', {
      title: 'registration',
      description: 'This is the registration'
   });
});

app.post('/Reg', function(request,response){
   console.log("running");
   var newa = new users({Firstname:"a",Email:"a@a.a",Password:"a"});
   newa.save(function (err) {
      if (err) return Error(err);
      // saved!
   });
   response.render('TeamSelect',{
      title: 'Team Select'
   });

});


function userExists(toFind){
	var exists = false;

	for(var i = 0; i < email.length; i++){
		if(email[i] === toFind){
			return true;
		}
	}
   return false;
}

app.post('TeamSelect',function(request,response){
    response.render('Home',{
        title: 'Home'
     });

});

app.post('/',function(request,response){
    console.log("running");

    var email = request.body.email;
    var password = request.body.password;

    //This is how you save. Using this in registration
    // var newa = new users({Firstname:"a",Email:"a@a.a",Password:"a"});
    // newa.save(function(err){
    //     if(err) return Error(err);
    // });


    users.find({Email:email, Password:password}).then(function(results){
        if(results.length > 0){

            //email found. check password
            //DO SOMETHING
        }
        else{
            //no email found, user doesnt exist
            //RETURN AN ERROR MESSAGE
        }
    });
});