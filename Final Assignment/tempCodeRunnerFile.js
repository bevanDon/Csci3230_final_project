
  var password = request.body.password;
  

  var login_data = {
   Name: Name,
   email: email,
   password:password};
   reg.find({email: email}).then(function(results) {