var express = require('express');
var router = express.Router();
var DB = require('../config/connection');
var HealthReport = DB.models.HealthReport;
// was the idea to have all the healthreports garnered from the scraper json file seeded into the database?

function error(response, message) {
  response.status(500);
  response.json({error: message});
}

// index of all health reports for all schools
// router.get('/health-reports', function(req, res) {
//   HealthReport.findAll().then(function(healthReports){
//     res.json(healthReports);
//   })
// })

module.exports = router;
