module.exports = function(channel , code , call){
    var wechatData = useConfig.get('wechatOptions')[channel];
    useRequest.send(null , null ,{
        url:'https://api.weixin.qq.com/sns/oauth2/access_token?'
        + 'appid=' + wechatData.appId
        + '&secret=' + wechatData.appSecret
        + '&code=' + code
        + '&grant_type=authorization_code',
        done:function(data){
            call && call(data);
        }
    })
};