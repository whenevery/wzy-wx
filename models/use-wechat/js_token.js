
var ACCESS_TOKEN = {};
module.exports = function(channel  , call){
    var wechatData = useConfig.get('wechatOptions')[channel];
    var token = ACCESS_TOKEN[wechatData.tokenChannel || channel];
    //10秒内为过期则不需要刷新
    if(token && token.expires_in - 10 > (new Date - token.createTime)/1000){
        call && call(token);
        return;
    }
    useRequest.send(null , null ,{
        url:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + wechatData.appId + '&secret=' + wechatData.appSecret,
        done:function(data){
            if(data.access_token){
                ACCESS_TOKEN[channel] = data;
                ACCESS_TOKEN[channel].createTime = Date.now();
            }
            call && call(ACCESS_TOKEN[channel]);
        }
    })
};