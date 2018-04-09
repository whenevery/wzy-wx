var express = require('express');
var router = express.Router();
router.get('/jscode/:channel', function(req, res, next) {
    var channel = req.params.channel;
    var wechatData = useConfig.get('wechatOptions')[channel];
        useRequest.send(req , res ,{
            url:'https://api.weixin.qq.com/sns/jscode2session' +
            '?appid=' + wechatData.appId+
            '&secret=' + wechatData.appSecret+
            '&js_code=' + req.query.js_code+
            '&grant_type=authorization_code',
            done:function(data){
                if(data.session_key)data.code = 0;
                res.useSend(data);
            }
        });
});
exports.router = router;
exports.__path = '/wechat';