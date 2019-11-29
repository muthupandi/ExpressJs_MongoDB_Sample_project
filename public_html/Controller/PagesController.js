module.exports = function(app){

    app.get('/',function(req, res) {

        
        res.render('Pages/home', { user: req.user });
      });

}