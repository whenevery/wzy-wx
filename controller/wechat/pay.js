var express = require('express');
var router = express.Router();
var WXBizDataCrypt = useWechat.decode;
router.post('/do/:channel', function(req, res, next) {
    var channel = req.params.channel;
    var wechatData = useConfig.get('wechatOptions')[channel];
    var appId = wechatData.appId;
    var sessionKey = req.body.sessionKey;
    var encryptedData = req.body.encryptedData;
    var iv = req.body.iv;
    var pc = new WXBizDataCrypt(appId, sessionKey);
    var data = pc.decryptData(encryptedData , iv);
    res.useSend({
        data:data,
        code:0
    })
});
exports.router = router;
exports.__path = '/wechat/pay';