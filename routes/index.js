var express = require('express');
var router = express.Router();

/* GET user page. */

router.get('/index', function (req, res, next) {
    Model('Article').find({}).populate('user').exec(function (err, articles) {
        res.redirect('/articles/list/1/2');
        //res.render('index', {title: '主页', articles: articles});
    });
});

module.exports = router;