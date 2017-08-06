var renderOptions = {
    section: 'survivalguide'
};

var express = require('express');
var router = express.Router();

router.get('/students', function (req, res) {
    var opts = renderOptions;
    opts.title = 'Survival Guide for Students';
    res.render('docs/students/index', opts);
});

module.exports = router;