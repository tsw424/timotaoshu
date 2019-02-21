var express = require('express');
var router = express.Router();
const { log,db,oauth, tool } = require("../../tool/require");


/*
*   page 页数
*   limit 一页几条
*
* */
router.use('', oauth(5003),  async function(req, res, next) {

    let limit = tool.getParams(req, 'limit') || 100;
    let page = tool.getParams(req, 'page') || 1;

    let data = null;
    try{
        let countdata = await db.query(` SELECT COUNT( id ) as cnt  FROM banners `);
        var count  = countdata[0]["cnt"];
        var bannerList =  await db.query(`SELECT *  FROM banners `);


        console.log("cnt= ",count , "bannerList=",bannerList)

        data = {
            bannerList,
            count
        };
        res.send(tool.toJson(data, '', 1000));
    } catch(err) {
        console.error( err );
        res.send(tool.toJson(null, JSON.stringify(err), 1002));
    }

});

module.exports = router;


// console.log(tool.redisData.authorList.getAuthorList());



