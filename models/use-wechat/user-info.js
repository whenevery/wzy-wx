module.exports = function(channel , code , call){
    useWechat.accessToken( channel , code , function(data){
        useRequest.send({} , {} ,{
            url:'https://api.weixin.qq.com/sns/userinfo?openid=' + data.openid
            +'&access_token=' + data.access_token + '&lang=zh_CN',
            done:function(data){
               call && call(data);
            }
        });
    });
};