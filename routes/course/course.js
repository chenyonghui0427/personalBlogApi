var express = require('express');
var router = express.Router();
const mysql = require('../../mysql/mysql')

router.post('/list', function (req, res, next) {
    mysql.query(
        `SELECT * FROM blog_course`
    ).then(result => {
        res.json({
            code: 1,
            list: result
        });
    })
        .catch(err => {
            res.json({
                code: -2,
                msg: "查询失败"
            });//
        })
})
router.post('/deleteCourse', function (req, res, next) {
    const {
        id
    } = req.body

    mysql.query(
        `DELETE FROM blog_course WHERE blog_course.course_id = ${id}`
    ).then(result => {
        res.json({
            code: 1,
            msg: '删除成功'
        });
    })
        .catch(err => {
            res.json({
                code: -2,
                msg: "查询失败"
            });
        })
})
router.post('/editCourse', function (req, res, next) {
    const {
        id,
        title,
        content,
        time
    } = req.body

    mysql.query(
        `UPDATE blog_course SET title='${title}',content = '${content}',time='${time}' WHERE blog_course.course_id = ${id}`
    ).then(result => {
        res.json({
            code: 1,
            msg: '修改成功'
        });
    })
        .catch(err => {
            res.json({
                code: -2,
                msg: "查询失败"
            });
        })
})
router.post('/addCourse', function (req, res, next) {
    const {
        title,
        content,
        time
    } = req.body
    if (!title || !content || !time) {
        res.json({
            code: 0,
            msg: "参数传递错误"
        });
    }
    mysql.query(
        `INSERT INTO blog_course (course_id, title, content, time) VALUES (NULL, '${title}', '${content}', '${time}') `
    ).then(result => {
        res.json({
            code: 1,
            msg: "添加个人旅程成功"
        });
    })
        .catch(err => {
            res.json({
                code: -2,
                msg: "添加失败"
            });
        })

});

module.exports = router;