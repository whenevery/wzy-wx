var express = require('express');
var router = express.Router();
router.post('/message', function(req, res, next) {
    useWechat.message(req.body,function(data){
        res.sendSuccess(data);
    })
});
exports.router = router;
exports.__path = '/wechat';
