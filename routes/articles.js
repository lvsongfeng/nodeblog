var express = require('express');
var router = express.Router();

/* GET articles page. */
router.get('/add', function (req, res) {
    res.render('articles/add', {title: '发表文章'});
});

module.exports = router