var express = require('express');
var router = express.Router();
router.get('/entrance/openid/:channel', function(req, res, next) {
    res.redirect(useWechat.entrance.openid([req.params.channel, req.query.port,req.query.host].join('--')));
});
router.get('/entrance/:channel', function(req, res, next) {
    res.redirect(useWechat.entrance.info([req.params.channel, req.query.port,req.query.host].join('--')));
});
router.get('/redirect', function(req, res, next) {
    var code = req.query.code;
    var state = req.query.state.split('--');
    var channel = state[0];
    var wechatData = useConfig.get( 'wechatOptions' )[channel];
    useWechat.userInfo( channel , code , function(userInfo){
        useWechat.openidInfo(channel , userInfo.openid , function(data){
            userInfo.subscribe = data.subscribe || '';
            userInfo.subscribeTime = data.subscribe_time || '';
            var url = useWechat.getWechatUrl(wechatData , req.query.state ,userInfo);
            res.useRedirect(url);
        });
    });
});
router.get('/redirect/openid', function(req, res, next) {
    var code = req.query.code;
    var state = req.query.state.split('--');
    var channel = state[0];
    var port = state[1];
    var wechatData = useConfig.get( 'wechatOptions' )[channel];
    useWechat.accessToken( channel , code , function(userInfo){
        useWechat.openidInfo(channel , userInfo.openid , function(data){
            userInfo.subscribe = data.subscribe || '';
            userInfo.subscribe_time = data.subscribe_time || '';
            var url = useWechat.getWechatUrl(wechatData , req.query.state ,userInfo);
            res.useRedirect(url);
        })
    });
});
exports.router = router;
exports.__path = '/wechat';