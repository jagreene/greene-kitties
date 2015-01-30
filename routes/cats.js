var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var mongoose = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var catSchema = mongoose.Schema({
  name: String,
  color: String,
  age: Number
});

var Cat = mongoose.model('Cat', catSchema)


var showCats = function(req, res){
    Cat.find().sort({age: -1}).exec(function(err, result){   
        var cats = result;
        console.log(cats);
        res.render('showCats', {"cats": cats});
    });
}

var newCat = function(req, res){
    var name = chance.name({ prefix: true, suffix: true });
    var color = chance.color({format: 'rgb'});
    var age = chance.age({type: 'child'});

    console.log(name);
    var cat = new Cat ({name:name, color:color, age:age});
    cat.save(function (err) {
        if (err) {
           console.log("Problem saving the kitty", err);
        }
        res.render('newCat', {"cat":cat});
    });
}

var colorCat = function(req, res){
    console.log(req.params.color);
    Cat.find({color:req.params.color}).sort({age: -1}).exec(function(err, result){   
        var cats = result;
        console.log(cats);
        res.render('showCats', {"cats": cats});
    });
}

var deleteCat = function(req, res){
    Cat.count({}, function (err, count){
        console.log(count);
        if (count > 0){
            Cat.findOneAndRemove().sort({age: -1}).exec(function(err, result){
                if (err){
                    console.log("Problem deleting " + result.name);
                }
                else{
                    res.render('deleteCat', {"name": result.name});
                }
            });
        } 
        else{
            res.render('emptyCat');
        }
    });
}

module.exports.showCats = showCats;
module.exports.newCat = newCat; 
module.exports.colorCat = colorCat; 
module.exports.deleteCat = deleteCat; 