$(document).ready(function() {
    $("#submit").click( function() {
        var mongoose = require('mongoose');
        var mongoDB = 'mongodb://127.0.0.1/university';
        mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
var login = new Schema({
    sid: {type: String, 
             validate: [/^1[0­9]{8}$/, 'must be be a valid email'],
             unique: true,
             index: true},
    Username: String,
    Password: String,
    }, {collection: 'Users'});
    

     
      var user_id = parseFloat($("#email").val());
      var password = parseFloat($("#password").val());
    
  

    
    })
  })
  