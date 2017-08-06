var renderOptions = {
    section: 'home'
};

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var opts = renderOptions;
  opts.title = 'Home';
  res.render('home', opts);
});

module.exports = router;