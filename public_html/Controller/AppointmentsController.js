var User = require('../Model/User');
var async = require('async');

module.exports = function(app) {

    app.all('/appointments/book', require('connect-ensure-login').ensureLoggedIn(),function(req, res, err){
        if(req.method == 'GET'){
            conditions = {'user_type' : 2}
            User.find(conditions, function(err, result){
                if (err) return next(err);
                cb(result, err);
            });

            function cb(result, err){
                console.log(result);
                if(err){
                    console.log(err);
                }
                if(result){
                    res.render('Appointments/book', { user: req.user, doctors: result });
                }
            }
        }else if(req.method == 'POST'){

        }

    });

    app.all('/appointments/all', function(req, res, err){

        async.parallel({
            doctors: function(callback){
                conditions = {'user_type' : 2}
                User.find(conditions, function(err, results){
                    if (err) return next(err);
                    callback(null, results)
                });
            },
            users: function(callback){
                conditions = {'user_type' : 3}
                User.find(conditions, function(err, results){
                    if (err) return next(err);
                    callback(null, results)
                });
            }
        },
        function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
        res.send('working');
    });

}