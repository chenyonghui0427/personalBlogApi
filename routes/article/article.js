var express = require('express');
var router = express.Router();
const mysql = require('../../mysql/mysql')


router.post('/list', async function (req, res, next) {
    const {
        pages,
        nums
    } = req.body
    if (pages === undefined || nums === undefined) {
        res.json({
            code: 0,
            msg: '参数错误',
            body: req.body,
            query: req.query
        });
    } else {
        let list = await mysql.query(
            "SELECT ba.article_id,ba.title,ba.content,ba.view,ba.create_time,ba.subtitle,IFNULL(bac.count ,'0') AS count FROM blog_article AS ba  LEFT JOIN (SELECT article_id,COUNT(id) AS count  FROM blog_article_comment_relational GROUP BY article_id ) AS bac ON ba.article_id = bac.article_id WHERE ba.is_delete != 1"
        )
        res.json({
            code: 1,
            msg: '获取成功',
            list: list,
            totals: list.length
        });

    }
});
router.post('/detail', async function (req, res, next) {
    // let article_id = req.query.id ? req.query.id : undefined;
    const {
        article_id
    } = req.body
    if (article_id === undefined) {
        res.json({
            code: 0,
            msg: '参数错误'
        });
    } else {
        let info =
            await mysql.query(
                `SELECT * FROM blog_article where article_id = ${article_id}`
            );
        let comments =
            await mysql.query(
                "select a.*,b.* from blog_article_comment_relational a left join blog_comment b on a.comment_id=b.comment_id"
            );
        let view = info[0].view + 1;
        await mysql.query(
            "UPDATE blog_article SET view = " + view + " WHERE article_id=" + article_id
        )
        res.json({
            code: 1,
            comments: comments,
            info: info[0]
        });
    }
})
router.post('/add_article', async function (req, res, next) {
    const {
        title,
        subtitle,
        content
    } = req.body
    let view = 0;
    let date = parseInt(Date.parse(new Date()) / 1000);
    if (content === undefined || title === undefined) {
        res.json({
            code: 0,
            msg: '参数错误'
        });
    } else {
        console.log(
            `INSERT INTO blog_article (article_id, is_delete, title, content, view, create_time, subtitle) VALUES (NULL, '0', '${title}', '${content}', '0', ${date}, '${subtitle}')`
        )
        let info = JSON.stringify(
            await mysql.query(
                `INSERT INTO blog_article (article_id, is_delete, title, content, view, create_time, subtitle) VALUES (NULL, '0', '${title}', ${content}, '0', ${date}, '${subtitle}')`
            )
        );
        res.json({
            code: 1,
            msg: '添加成功'
        });
    }

})
router.post("/delete_article", async (req, res, next) => {
    const {
        id
    } = req.body
    if (id === undefined) {
        res.json({
            code: 0,
            msg: '参数错误'
        });
    } else {
        let info = JSON.stringify(
            await mysql.query(
                `UPDATE blog_article SET is_delete = 1 WHERE article_id = ${id}`
            )
        );
        res.json({
            code: 1,
            msg: '删除成功'
        });
    }

});
module.exports = router;