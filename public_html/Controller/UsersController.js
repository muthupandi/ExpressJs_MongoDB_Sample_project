var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;
var User = require('../Model/User');

module.exports = function(app){

app.get('/signup',function(req, res){
  res.render('Users/signup');
});

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/users/dashboard',
  failureRedirect : 'Users/signup',
  failureFlash: 'Wrong username or password'
}), function(err, result){
  console.log(err);
});

app.get('/login',function(req, res){
    const message = req.flash();
    console.log(message);
    res.render('Users/login',  { message });
  });
  
app.post('/login', passport.authenticate('local', { 
  successRedirect : '/users/dashboard',
    failureRedirect : '/login',
    failureFlash: 'Invalid username or password.'
  }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/users/dashboard',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('Users/dashboard', { user: req.user });
  });	

  app.all('/users/profile', require('connect-ensure-login').ensureLoggedIn(), function(req, res, err){
        
    if(req.method =="GET")  {

        var success={};
        var error={};
        res.render('Users/profile', { 
          user: req.user, 
          success: req.session.success, 
          errors: req.session.errors 
        }, function (err, html){
          req.session.errors = {};
          req.session.success = {};
          res.send(html);
        });
        

    }else if(req.method =="POST"){

      const user = req.user;
      var conditions = {'_id' : new ObjectId(req.user.id)}
      var update_data = req.body;
      update_data.phone = req.body.phone;
      
      User.findOneAndUpdate(conditions, update_data, {upsert:false, new: true, runValidators: true}, function(err, doc){
        req.session.errors={};
        if (err) {
          if (err.name == 'ValidationError') {
            for (field in err.errors) {
              req.session.errors[err.errors[field].path] = err.errors[field].message;
            }
            req.session.success = false;
            //res.redirect('/Users/profile');
          }
        }
        //return res.send("succesfully saved");
        res.redirect('/Users/profile');
      });

    } 

});

	
}
