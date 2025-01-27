var express = require('express');
var router = express.Router();

// middleware that is specific to this router

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ message: 'hello world' });
});

router.get('/moha', function (req, res, next) {
  res.json({ message: 'hello moha' });
});

router.get('/adnan', function (req, res, next) {
  res.json({ message: 'hello adnan' });
});

router.get('/m', function (req, res, next) {
  res.json({ message: 'hello wxxxorld' });
});

module.exports = router;
