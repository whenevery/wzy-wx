var crypto = require('crypto');
var uuid = require('uuid');
var redis = require('redis')
var redisClient = redis.createClient('6379', '127.0.0.1');
var config = {
  SECRET:'sessionsecret',
  session_key:global.PACKAGE.name,
  maxAge:7 * 24 * 3600 ,//cookie缓存时间 天
  expires:30 * 60 ,//redis缓存时间 30分钟
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
}
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
    redisClient.get('session:'+sessionId , function(err, o){
      if(err){
        console.error(err)
      }
      if(o){
        req.session = JSON.parse(o);
        writeHead(req , res);
        return next();
      } else{
        req.session = new session(sessionId);
        writeHead(req , res);
        session.save(req, res, next);
      }
    });
  };
};
session.save = function(req , res, next){
  var sessionData = req.session;
  redisClient.set('session:'+sessionData.sessionId, JSON.stringify(sessionData),function(err, a){
    if(err){
      console.error(err)
    }
    session.expire(req, res, next);
  })
};
session.expire = function(req , res, call){
  redisClient.expire('session:'+ req.session.sessionId, config.expires, function(err, a){
    if(err){
      console.error(err)
    }
    if(call)call()
  })
};
module.exports = session;
