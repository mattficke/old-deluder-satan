var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs')
var DB = require('./config/connection');
var User = DB.models.User;
// solid
app.use(require('express-session')({
  secret: 'deluder',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use("/assets", express.static(path.join(__dirname + "/assets")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

passport.use(new LocalStrategy(function(username, password, callback){
  User.findOne({
    where: {
      username: username
    }
  }).then(function(user, err){
    if (err) { return callback(err); }
    if (!user) {
      return callback(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)){
      return callback(null, false);
    }
    return callback(null, user);
  })
}))

passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
  User.findById(id).then(function(user){
    callback(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, callback){
  if(req.user){
    res.locals.user = req.user.username
  }
  callback()
})

var schoolsController = require('./controllers/schools');
var usersController = require('./controllers/users');

var healthReportsController = require('./controllers/healthreports');
var commentsController = require('./controllers/comments');


app.get('/', function(req, res) {
  res.render("index");
});

app.use('/', schoolsController);
app.use('/', usersController);
app.use('/', healthReportsController);
app.use('/', commentsController);

app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function() {
  console.log("Listening on port 4000");
});
