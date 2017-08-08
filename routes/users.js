var express = require('express');
var router = express.Router();
var middleware = require('../middleware')
/* GET users page. */
/*router.get('/', function (req, res, next) {
 res.render('user', {title: 'hi user'});
 });*/
function md5(val) {
    return require('crypto').createHash('md5').update(val).digest('hex');
}
// 用户注册
router.get('/reg',middleware.checkNotLogin, function (req, res) {
    res.render('user/reg', {title: '注册'})
})

// 用户注册提交
router.post('/reg', function (req, res) {
    var user = req.body;
    if (user.password != user.repassword) {
        req.flash('error', '两次输入的密码不一致');
        return res.redirect('/users/reg');
    }
    delete user.repassword; //由于repassword不需要保存，所以可以删除
    user.password = md5(user.password);
    user.avatar = "https://secure.gravatar.com/avatar/" + md5(user.email) + "?s=48"; //得到用户的头像
    new Model('User')(user).save(function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/users/reg');
        }
        req.session.user = user;//用户信息存入 session
        res.redirect('/index');//注册成功后返回主页
    });

})

// 用户登录
router.get('/login', function (req, res) {
    res.render('user/login', {title: "登录"})
})

router.post('/login', function (req, res) {
    var user = req.body;
    user.password = md5(user.password);
    Model('User').findOne(user, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/users/login');
        }
        req.session.user = user;//用户信息存入 session
        res.redirect('/index');//注册成功后返回主页
    })
})
// 用户退出
router.get('/logout', function (req, res) {
    req.session.user = null;//用户信息存入 session
    res.redirect('/index');//注册成功后返回主页
})
module.exports = router;