module.exports = {
    info:function(channel){
        var wechatData = useConfig.get('wechatOptions')[channel.split('--')[0]];
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            'appid=' + wechatData.appId +
            '&redirect_uri=' + encodeURIComponent(useConfig.get('redirect_uri')
                + '/wechat/redirect') +
            '&response_type=code' +
            '&scope=snsapi_userinfo'+
            '&state=' + channel +
            '#wechat_redirect';
    },
    openid:function(channel){
        var wechatData = useConfig.get('wechatOptions')[channel.split('--')[0]];
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            'appid=' + wechatData.appId +
            '&redirect_uri=' + encodeURIComponent(useConfig.get('redirect_uri')
                + '/wechat/redirect/openid') +
            '&response_type=code' +
            '&scope=snsapi_base'+
            '&state=' + channel +
            '#wechat_redirect';
    }
};