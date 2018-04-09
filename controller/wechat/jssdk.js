var express = require('express');
var router = express.Router();

router.post('/jssdk/:channel',function(req, res, next) {
    var channel = req.params.channel;
    var wechatData = useConfig.get('wechatOptions')[channel];
    useWechat.jsapi_ticket(channel , function(JSAPI_TICKET){
        var jsticket = useWechat.sign.jsticket(JSAPI_TICKET , req.body.url);
        res.useSend({
            code:0,
            data:{
                appId:wechatData.appId,
                timestamp:jsticket.timestamp,
                nonceStr:jsticket.nonceStr,
                signType:jsticket.signType,
                signature:jsticket.sign,
            }
        })
    });
});
exports.router = router;
exports.__path = '/wechat';