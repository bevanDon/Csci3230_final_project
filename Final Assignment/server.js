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

app.get('reg',function(request,response){
  var newa = new users({Firstname:"a",Email:"a@a.a",Password:"a"});
  var exists = 0;
     newa.save(function(err){
         if(err) return Error(err);
     });
     users.find({Email:email, Password:password}).then(function(results){
      if(results.length > 0){
         for (var i = 0; i < email.length; i++) {
            if (Email[i] === email) {
               exists++;
              
            }
          }
          if (exists == 0) {
            response.render('reg', {title: 'Username available',
                                              message: 'That username is available'});
          } else {
           
                                              response.render('reg', {title: 'Username unavailable',
                                              message: 'This username already exists. Please try another.'});
          }
      }
     
  });

});

// web listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
   console.log('Server listening on port ' + app.get('port'));
});