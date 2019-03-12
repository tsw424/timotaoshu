const {fs, rp,timoRp, path, tool, log} = require("../tool/require");

module.exports = getImg;

/*
* 得到图片
* */
async function getImg(bookId, imgUrl){
    // try{
    //     tool.hasDir(fs, path.join(__dirname, "../../books"));
    //     tool.hasDir(fs, path.join(__dirname, "../../books/" + bookId))
    // }catch(err) {
    //     bookId = tool.jiami(bookId);
    //     tool.hasDir(fs, path.join(__dirname, "../../books/" + bookId))
    // }
    tool.hasDir(fs, path.join(__dirname, "../../books"));
    let start = 0;
    await requestImg();

    async function requestImg() {
        start++;
        let option = {
            uri: imgUrl,
            encoding : "binary"
        };
        let ip = await tool.redisData.ipList.getRandomIpList();
        if(ip) option.proxy = ip;
        // global.server && (option.proxy = global.serverProxy);
        try{
            let imgData = await timoRp(option);
            let filePath = tool.isRepeat(fs, path.join(__dirname, "../../books/"+bookId+".png"));
            fs.writeFileSync(filePath, imgData, "binary");
        }catch(err){
            if(start >= 5) {
                log.error(`获取${bookId}图片失败`);
                log.error(err);
            } else {
                await requestImg();
            }
        }
    }

}