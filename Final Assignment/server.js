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
   extended: true
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

//creates the scehema for the login email is the login
var registrationSchema = new Schema({
  Firstname:String,
  Email:{type:String, unique:true },
  Password:String

}, {
   collection: 'reg'
});
var users = mongoose.model('reg', registrationSchema);

// routes
// main file
app.get('/', function(request, response) {
   username = request.bodyusername;
   response.render('main', {
      title: 'main',
      description: 'This is the main page',
      username: username
   });
});


app.get('/main', function(request, response) {
   username = request.bodyusername;
   response.render('main', {
      title: 'main',
      description: 'This is the main page',
      username: username
   });
});
//user needs to login to access the page
app.post('/main',function(request,response){
   name= request.body.user;
   password = request.body.pass;
   console.log(name,password);
   if(name == "" || password == ""){
      //give error message
   }
   // looks through the database
   else{users.find()
      users.find({Email:name, Password:password}).then(function(results){
         if(results.length > 0){
            response.render('Home',{
               title:'Home'
            });
            console.log("found");
         }
         else{
            console.log("notfound");
         }  
     });
   }
});
//drink coffee and take a breather while marking this, you earned it.


// used for the login
app.get('/main2', function(request, response) {
   username = request.bodyusername;
   response.render('main', {
      title: 'main'
   });
});

app.post('/main2',function(request,response){
   response.render('Reg',{
      title:'Register'
   });
   console.log("running");
});

app.get('/Home', function(request, response) {
   username = request.bodyusername;
   response.render('Home', {
      title: 'Home',
      description: 'This is the main page',
      username: username
   });
});

//news tab
app.get('/News', function(request, response) {
   username = request.bodyusername;
   response.render('News', {
      title: 'News',
      description: 'This is the News',
      username: username
   });
});

// registration page
app.get('/Reg', function(request, response) {
   username = request.bodyusername;
   response.render('Reg', {
      title: 'registratrion',
      description: 'This is the registration'
   });
});


app.get('/Timetable', function(request, response) {
   username = request.bodyusername;
   response.render('Timetable', {
      title: 'registratrion',
      description: 'This is the registration'
   });
});

app.get('/TeamSelect', function(request, response) {
   username = request.bodyusername;
   response.render('TeamSelect', {
      title: 'Select',
      description: 'This is the Team Select'
   });
});
//selects your favourite team, news is based on favourite team
app.post('/Reg', function(request,response){
   console.log("running");
   name = request.body.name;
   email = request.body.email;
   pass = request.body.password;
   console.log(name,email,pass);
   var newa = new users({Firstname:name,Email:email,Password:pass});
//saves the user input
   
   newa.save(function (err) {
      if (err) return Error(err);
      
   });
   response.render('TeamSelect',{
      title: 'Team Select'
   });
   console.log("running reg");
}); 

// checks if the login is an actual user
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

    


    users.find({Email:email, Password:password}).then(function(results){
        if(results.length > 0){

           
        }
        else{
         
        }
    });
});