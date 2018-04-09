var express = require('express');
var router = express.Router();
router.get('/template/:channel', function(req, res, next) {
    var channel = req.params.channel || 'test';
    useWechat.jsToken(channel,function(ACCESS_TOKEN){
        useRequest.send(req , res , {
            url:'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+ACCESS_TOKEN.access_token,
            method:'POST',
            data:JSON.stringify({
                touser:'oK2u8wvjE1DxjGUNcl7K2aYl9pUc',
                template_id:'oGyS5ag_OOM2VIj62lDq9Y-oz6RT24SFPMEbd7qINgA',
                url:'http://www.baidu.com',
                data:{
                    orderTime:{
                        value:useCommon.parseDate(new Date , 'Y-m-d H:i:s'),
                        "color":"#173177"
                    },
                    amount:{
                        value:Math.random() * 10000 | 0
                    },
                    orderType:{
                        value:['订座','买酒','送人'].sort(function(){return .5-Math.random()}).pop()
                    }
                }
            }),
            done:function(a){
                res.send(a);
            }
        })
    });
});
exports.router = router;
exports.__path = '/wechat';
