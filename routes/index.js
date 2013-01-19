
exports.index = function(req, res){
    res.render('device');
};

exports.piano = function(req, res){
    res.render('piano');
};

exports.listen = function(req, res){
    res.render('client');
};

exports.guitar = function(req, res){
    res.render('guitar');
};
