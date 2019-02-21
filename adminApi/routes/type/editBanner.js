

/*
    seq: this.banner.seq,
    alt:this.banner.alt,
    img_src:this.banner.img_src,
    use_yn:this.banner.use_yn,
    href_src:this.banner.href_src,
    id:this.banner.id
 */


var express = require('express');
var router = express.Router();
const { log,db,oauth, tool } = require("../../tool/require");


/*
*   page 页数
*   limit 一页几条
*
* */
router.use('', oauth(5003),  async function(req, res, next) {

    console.log(req)

        let seq         =   tool.getParams(req,'seq') || 0;
        let alt         =   tool.getParams(req,'alt') || " ";
        let img_src     =   tool.getParams(req,'img_src') || " ";
        let  use_yn     =   tool.getParams(req,'use_yn') || 1;
        let href_src    =   tool.getParams(req,'href_src') || " ";
        let id          =   tool.getParams(req,'id') ;

        let createDt    =  Date.now();
        let params = [img_src,href_src,use_yn,alt,seq,id];

        console.log( "params=",params)
    try{

        let insertsql = " INSERT INTO  `banners`  ( `img_src`,`href_src`, `use_yn`, `alt`,`seq`) VALUES ( ?,?, ?,?,?) ";
        let updatesql = "UPDATE  `banners` SET `img_src` = ?,  `href_src` = ?,  `use_yn` = ?,  `alt` = ?,  `seq` = ? WHERE `id` = ? ";

        let dosql = null;

        if( id && id>0){
            dosql = updatesql;
        }else {
            dosql = insertsql;
        }
        var result =  await db.queryparam( dosql,params );

        console.log( "result=",result);
        res.send(tool.toJson({successMsg:"操作成功"}, '', 1000));
    } catch(err) {
        console.error( err );
        res.send(tool.toJson(null, `数据出错,出错原因：${err}`, 1002));
    }

});

module.exports = router;


// console.log(tool.redisData.authorList.getAuthorList());



