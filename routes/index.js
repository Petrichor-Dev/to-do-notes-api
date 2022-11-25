var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tes', function (req, res) {
  res.render('tes', { title: 'tes page' });
});

module.exports = router;
