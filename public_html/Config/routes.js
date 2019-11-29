
var fs = require('fs');
var path = require('path');

module.exports = function(app){
    
    var controller_dir = path.join(__basedir, 'Controller');
    fs.readdirSync(controller_dir).forEach(function(file) {
        if (file == "ErrorsController.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js') return;
        var name = file.substr(0, file.indexOf('.'));
        require('./../Controller/' + name)(app);
    });
    //Note: Invalid routes should be added last. So that It added after define all reoutes
    require('./../Controller/ErrorsController.js')(app);
}
