var express = require('express');
var router = express.Router();
var middleware = require('../middleware')

/* GET articles page. */
router.get('/add', function (req, res) {
    res.render('articles/add', {title: '发表文章', article: {}});
});
router.post('/add', function (req, res) {
    var _id = req.body._id;
    if (_id) {
        var set = {title: req.body.title, content: req.body.content};
        Model('Article').update({_id: _id}, {$set: set}, function (err, result) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '更新文章成功!');
            res.redirect('/index');//发表成功后返回主页
        });
    } else {
        req.body.user = req.session.user._id;
        new Model('Article')(req.body).save(function (err, article) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/articles/add');
            }
            req.flash('success', '发表文章成功!');
            res.redirect('/index');//发表成功后返回主页
        });
    }
})
router.get('/detail/:_id', function (req, res) {
    Model('Article').findOne({_id: req.params._id}, function (err, article) {
        article.content = article.content;
        res.render('articles/detail', {title: '查看文章', article: article});
    });
});
router.get('/edit/:_id', function (req, res) {
    Model('Article').findOne({_id: req.params._id}, function (err, article) {
        if (err) {
            console.log('is error')
        }
        res.render('articles/add', {title: '编辑文章', article: article});
    });
});
router.get('/delete/:_id', function (req, res) {
    var _id = req.params._id
    Model('Article').remove({_id}, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        }
        req.flash('success', '删除文章成功!');
        res.redirect('/index');//删除成功后返回主页
    });
});
router.get('/list/:pageNum/:pageSize', function (req, res, next) {
    var pageNum = req.params.pageNum && req.params.pageNum > 0 ? parseInt(req.params.pageNum) : 1;
    var pageSize = req.params.pageSize && req.params.pageSize > 0 ? parseInt(req.params.pageSize) : 2;
    var query = {};
    var searchBtn = req.query.searchBtn;
    var keyword = req.query.keyword;
    if (searchBtn) {
        req.session.keyword = keyword;
    }
    if (req.session.keyword) {
        query['title'] = new RegExp(req.session.keyword, "i");
    }

    Model('Article').count(query, function (err, count) {

        Model('Article').find(query).sort({createAt: -1}).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user').exec(function (err, articles) {
            articles.forEach(function (article) {
                article.content = article.content;
            });
            res.render('index', {
                title: '主页',
                pageNum: pageNum,
                pageSize: pageSize,
                keyword: req.session.keyword,
                totalPage: Math.ceil(count / pageSize),
                articles: articles
            });
        });
    });
});
module.exports = router