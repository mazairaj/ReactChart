// REST API routes go here.

var express = require('express');
var router = express.Router();


router.get('/event', function(req, res, next) {
  Event.find(function(err, events) {
    if (err) return next(err);
    res.send(events);
  });
});

router.put('/event', function(req, res, next) {
  // Your code here
});

router.post('/event', function(req, res, next) {
  // Your code here
});

router.delete('/event', function(req, res, next) {
  // Your code here
});

module.exports = router;
