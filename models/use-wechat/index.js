function wechat(){

}
wechat.getWechatUrl = function(wechatData ,redirect_uri, data ){
    var href = redirect_uri.split('--');
    var channel = href[0];
    var port = href[1];
    var host = href[2];
    var url = wechatData.redirect_uri;
    if(host){
        url = 'http://' + host;
    }
    if(port){
        url += ':' + port;
    }
    url += wechatData.redirect_path;
    url = useCommon.addUrlParam(url , data);
    return url;
};
wechat.accessToken = require('./access_token');
wechat.jsToken = require('./js_token');
wechat.jsapi_ticket = require('./jsapi_ticket');
wechat.entrance = require('./entrance');
wechat.userInfo = require('./user-info');
wechat.openidInfo = require('./openid-info');
wechat.sign = require('./sign');
wechat.decode = require('./de-code.js');
wechat.login = require('./login.js');
wechat.message = require('./message.js');
module.exports = wechat;