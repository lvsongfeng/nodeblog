var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', function (req, res, next) {
    res.render('user', {title: 'hi user'});
});

// 用户注册
router.get('/reg', function (req, res) {
    res.render('user/reg', {title: '注册'})
})

// 用户注册提交
router.post('/reg', function (req, res) {

})

// 用户登录
router.get('/login', function (req, res) {
    res.render('user/login', {title: "登录"})
})

// 用户退出
router.get('/logout',function (req,res) {
    
})
module.exports = router;