
var Strategy = require('passport-local').Strategy;
var ObjectId = require('mongodb').ObjectID;
var User = require('../Model/User');

var myLocalConfig = (app, passport) => {

  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `done` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy(
    function (username, password, done) {
      User.findOne({ 'username': username }, function (err, user) {
        if (err) {
          console.log(error)
          return done(err);
        }
        if (!user) { return done(null, false); }
        if (!user.validPassword(password, user.password)) { return done(null, false); }
        return done(null, user);
      });
    }));

  passport.use('local-signup', new Strategy({passReqToCallback : true},
    function (req, username, password, done) {
      //console.log(req.body);
      // create the user
        var newUser = new User();
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.username = username;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(password);
        newUser.user_type = 3; //1-Admin, 2-Doctor 3-Admin
        var addresses = [
          {name: 'home', street: 'W Division', city: 'Chicago'},
          {name: 'office 1', street: 'Beekman', city: 'New York'},
          {name: 'office 2', street: 'Florence', city: 'Los Angeles'},
      ];
      newUser.addresses = addresses;
        
        newUser.save(function (err) {
            if (err)
                return done(err);
            return done(null, newUser);
        });
    }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {

    User.findById({ _id: id }, function (err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  });

}
module.exports = myLocalConfig;
