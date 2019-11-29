var ObjectId = require('mongodb').ObjectID;
var User = require('../Model/User');

module.exports = function(app){

app.get('/address/list', require('connect-ensure-login').ensureLoggedIn(), function(req, res, erro){

    res.render('Addresses/list', { user: req.user });

});

app.all('/address/add', function(req, res, err){

    if(req.method == "GET")  {
        res.render('Addresses/add', { user: req.user });
    }else if(req.method == "POST")  {

        var conditions = {'_id' : new ObjectId(req.user.id)}
        address = req.body;

        User.findOne(conditions, function(err, result){
            var user = result;
            user.addresses.push(address);
            user.save(function(err, result) {
                console.log(result);
                res.redirect('/address/list');
            });
        });
    }

});


}