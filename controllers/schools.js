var express = require('express');
var router = express.Router();
var DB = require('../config/connection');
var School = DB.models.School;

function error(response, message) {
  response.status(500);
  response.json({error: message});
}

// get for ALL schools, index

// post for schools (post-MVP using automated scraper)

// get for individual schools, show

// get for individual schools, shows all health reports. We will axe this.



router.get('/schools', function(req, res) {
  School.findAll().then(function(schools){
    res.json(schools);
  })
})

router.get("/schools/:id", function(req, res){
  School.findById(req.params.id).then(function(school){
    if(!school) return error(res, "not found");
    res.json(school);
  });
});

router.get("/schools/:id/health-report", function(req, res){
  School.findById(req.params.id).then(function(school){
    if(!school) return error(res, "not found");
    school.getHealthreport().then(function(healthReport){
      //add the school name and address to the json returned here so we can
      //populate the selected school section
      healthReport.dataValues.name =school.dataValues.name;
      healthReport.dataValues.address =school.dataValues.address;
      res.json(healthReport);
    });
  });
});

router.get("/schools/:id/comments", function(req, res){
  if(req.user) {
    var user = {
      username: req.user.username,
      id: req.user.id
    }
  }
  School.findById(req.params.id)
  .then(function(school){
    if(!school) return error(res, "not found");
    return school.getComments().then(function(comments){
      res.json({comments: comments, user: user || null});
    });
  });
});


module.exports = router;
