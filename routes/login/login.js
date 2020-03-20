var express = require('express');
var router = express.Router();
const mysql = require('../../mysql/mysql')

/* GET home page. */
router.post('/login', function (req, res, next) {
    const {
        username,
        password
    } = req.body
    mysql.query(
        `SELECT * FROM blog_user WHERE user_name = '${username}' `
    ).then(result => {
        if (result.length === 0) {
            res.json({
                code: 0,
                msg: "用户不存在"
            });
        } else {
            let response = result[0];
            if (response.user_name == username && response.user_password == password) {
                res.json({
                    code: 1,
                    msg: "登陆成功"
                });
            } else {
                res.json({
                    code: -1,
                    msg: "用户名或密码有误"
                });
            }
        }
    })

});

module.exports = router;