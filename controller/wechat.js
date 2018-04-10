var express = require('express');
var router = express.Router();
router.post('/message', function(req, res, next) {
    useWechat.message(req.body,function(data){
        res.sendSuccess(data);
    })
});
router.post('/user/sm', function(req, res, next) {
    req.body.openid = req.body.openid || req.body.openId;
    useData.addUser(req.body, function(data){
        useMysql.searchOne(useSql.common.search('user', {openid:req.body.openid}), function(err, data){
          res.sendSuccess(data);
        })
    })
});
exports.router = router;
exports.__path = '/wechat';
