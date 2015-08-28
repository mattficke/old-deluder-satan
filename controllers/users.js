var express = require('express');
var router = express.Router();
var passport = require('passport')
var bcrypt = require('bcrypt-nodejs')
var DB = require('../config/connection');
var User = DB.models.User;

function error(response, message) {
  response.status(500);
  response.json({error: message});
}

router.get('/users', function(req, res) {
  User.findAll().then(function(users){
    res.json(users);
  })
})

router.get('/users/:id', function(req, res) {
  User.findById(req.params.id).then(function(user){
    res.json({username: user.username, id: user.id})
  })
})

router.get('/signup', function(req, res) {
  res.render('auth/signup')
})

router.post('/signup', function(req, res, callback) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user){
    if(!user){
      User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
      }).then(function(user){
        passport.authenticate("local", {
          failureRedirect: '/signup',
          successRedirect: '/'
        })(req, res, callback)
      })
    } else {
      res.send("user exists")
    }
  })
})

router.get('/signin', function(req, res){
  res.render('auth/signin')
})

router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  successRedirect: '/'
}))

router.get('/signout', function(req, res){
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
