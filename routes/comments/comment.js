var express = require('express');
var router = express.Router();
const mysql = require('../../mysql/mysql')


router.post('/list', async function (req, res, next) {
    // var totals, data;
    const {
        pages,
        nums
    } = req.body
    if (pages === undefined || nums === undefined) {
        res.json({
            code: 0,
            msg: '参数错误'
        });
    } else {
        let totals =await mysql.query(
            "SELECT * FROM blog_comment "
        )
        let list = JSON.stringify(await mysql.query(
            "select a.*,b.* from blog_article_comment_relational a left join blog_comment b on a.comment_id=b.comment_id "
        ))
        res.json({
            code: 1,
            msg: '获取成功',
            list: list,
            totals:totals.length
        });
    }
});
router.post('/add_comment', async function (req, res, next) {
    const {
        id,
        content,
        people
    } = req.body
    let date = parseInt(Date.parse(new Date()) / 1000);
    if (id === undefined || content === undefined || people === undefined) {
        res.json({
            code: 0,
            msg: '参数错误'
        });
    } else {
        let data =
            await mysql.query(
                `INSERT INTO blog_comment (comment_id,comment_content,comment_people)VALUES(null,"${content}","${people}")`
            );

        let data1 = await mysql.query(
            `INSERT INTO blog_article_comment_relational (id,article_id,comment_id,comment_date)
            VALUES(null,${id},${data.insertId},${date})`

        );
        res.json({
            code: 1,
            msg: '评论成功'
        });
    }
});
module.exports = router;