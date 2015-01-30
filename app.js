var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var cats = require('./routes/cats');

var app = express();

var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', cats.newCat);
app.get('/cats', cats.showCats);
app.get('/cats/new', cats.newCat);
app.get('/cats/bycolor/:color', cats.colorCat);
app.get('/cats/delete/old', cats.deleteCat);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});