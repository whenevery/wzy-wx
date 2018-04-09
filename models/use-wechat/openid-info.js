module.exports = function(channel , openid , call){
    useWechat.jsToken( channel  , function(ACCESS_TOKEN){
        useRequest.send({} , {} ,{
            url:'https://api.weixin.qq.com/cgi-bin/user/info?openid='+openid+'&access_token=' + ACCESS_TOKEN.access_token,
            done:function(data){
                call && call(data);
            }
        });
    });
};