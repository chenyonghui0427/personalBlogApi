var express = require('express');
var router = express.Router();
const mysql = require('../mysql/mysql')

/* GET home page. */
router.post('/', function (req, res, next) {
    let obj = {
        name: '2112'
    }
    console.log(req.query)
    res.json(obj);
});
router.post('/post', async function (req, res, next) {


    let data = await mysql.query(
        'SELECT *  FROM `blog_comment` '
    )
    console.log(data)
    res.json({
        msg: "1212",
        data: data[0]
    })
});

module.exports = router;