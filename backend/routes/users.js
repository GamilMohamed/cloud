var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/adnan', function(req, res, next) {
  res.send('omg adnan');
});

router.get('/mx', function(req, res, next) {
  res.send('omg m');
});

module.exports = router;
