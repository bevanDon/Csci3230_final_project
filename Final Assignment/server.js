var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

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


app.get('/Reg', function(request, response) {
   username = request.session.username;
   response.render('Reg', {
      title: 'registration',
      description: 'This is the registration',
      username: username
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
function reloadUserList(request, response, errorMessage) {
   Student.find().then(function(results) {
     response.render('reg', {title: 'users List',
                                  reg: results,
                                  errorMessage: errorMessage});
   });
 }

app.get('reg',function(request,response){
  var newa = new users({Firstname:"a",Email:"a@a.a",Password:"a"});
  var exists = 0;
  db.collection
  var  Name= request.body.name;
  var email = request.body.email;
  var password = request.body.password;


  var login_data = {
   Name: Name,
   email: email,
   password:password};
   reg.find({email: email}).then(function(results) {
      if (results.length > 0) {

        reg.update({Name:Name},
                       login_data,
                       {multi: false},
                       function(error, numAffected) {
          if (error || numAffected != 1) {
            console.log('Unable to update account: ' + error);
            reloadStudentList(request, response, 'Unable to update account');
          } else {
            reloadStudentList(request, response, 'account updated');
          }
        });
      } else {
        // save a new user
        var newUser = new users(login_data);
        newUser.save(function(error) {
          if (error) {
            console.log('Unable to save student');
            reloadUserList(request, response, 'Unable to add account');
          } else {
            reloadUserList(request, response, 'account added');
          }
        });
      }
    });

});

// web listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
   console.log('Server listening on port ' + app.get('port'));
});
