module.exports = function(app){

    app.all('*',function(req, res, err){
        res.render('Errors/404');
    });
}