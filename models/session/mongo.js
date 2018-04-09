var crypto = require('crypto');
var uuid = require('uuid');
var config = {
    SECRET:'sessionsecret',
    session_key:'pc',
    maxAge:7 * 24 * 3600 ,//cookie缓存时间
    expires:30 * 60 * 1000 ,//redis缓存时间
    path:"/",
    httpOnly:true
};
var sign = function (val, secret) {
    return val + '.' + crypto
            .createHmac('sha1', secret || config.SECRET)
            .update(val + '')
            .digest('base64')
            .replace(/[\/\+=]/g, '');
};
var serialize = function (name, val, opt) {
    var pairs = [name + '=' + encodeURIComponent(val)];
    opt = opt || {};
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join('; ');
};
var writeHead = function (req , res) {
    if(res.__hasWriteHead)return;
    res.__hasWriteHead = true;
    var cookies = res.getHeader('Set-Cookie');
    cookies = cookies || [];
    var session = serialize(config.session_key, req.session.sessionId , config);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    res.setHeader('expires', 0);
    res.setHeader('max-age', 0);
    res.setHeader('cache-control', 'no-store,no-cache');
    res.setHeader('pragma', 'no-cache');
    res.setHeader('X-Frame-Options','SAMEORIGIN');
};
function session(sessionId){
    this.sessionId = sessionId;
    this.__CSRF = uuid.v1();
    this.cookie = {
        expires:config.expires + Date.now()
    };
}
var mongo,sessionDb;
session.init = function (options) {
    options = options || {};
    for(var i in options){
        if(options[i])config[i] = options[i];
    }
    return function (req, res, next) {
        var sessionId = req.headers.sessionid || useCommon.getCookieData(req.headers.cookie)[config.session_key] ;
        if(!sessionId){
            sessionId = sign(uuid.v1());
        }
        if(!mongo)mongo = useMongo();
        if(!sessionDb)sessionDb = mongo.create('session');
        sessionDb.findOne({sessionId:sessionId} , function(o){
            var data = o.data;
           if(data){
               req.session = JSON.parse(data.content);
               writeHead(req , res);
               return next();
           } else{
               req.session = new session(sessionId);
               writeHead(req , res);
               session.add(req.session , next);
           }
        });
    };
};
session.del = function(sessionId , call){
    sessionDb.del({sessionId:sessionId},function(){
        call();
    })
};
session.save = function(req , res, call){
    var sessionData = req.session;
    var sessionId = sessionData.sessionId;
    sessionDb.findOne({
        sessionId:sessionData.sessionId
    },function(a){
        var data = a.data;
        writeHead(req , res);
        if(data){
            session.edit(sessionData , call)
        }else{
            session.add(sessionData , call)
        }
    })
};
session.add = function(sessionData , call){
    sessionDb.save({
        sessionId:sessionData.sessionId,
        content:JSON.stringify(sessionData),
        updateTime:new Date,
        createTime:new Date
    },function(a){
        if(call)call();
    });
};
session.edit = function(sessionData , call){
    sessionDb.update ({sessionId:sessionData.sessionId}
        ,{
        content:JSON.stringify(sessionData),
        updateTime:new Date
    },function(a){
        if(call)call();
    });
};
session.del = function(sessionId , call){
    sessionDb.del({sessionId:sessionId}
        ,function(a){
        if(call)call();
    });
};
module.exports = session;
