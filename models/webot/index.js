var Webot = require('weixin-robot');
var webots = {};
module.exports = {
    make:function(app , data){
        console.log('weixin-robot');
        console.log(data);
        var webot = new Webot.Webot();
        webot.watch(app, {
            token: data.token ,
            path: '/wechat/token/check/'+data.channel
        });
        webots[data.channel] = webot;
        var redirect_message = data.redirect_message;
        webot.set(function(info , next) {
            send(info , next);
        });
        function send(info , next){
            useRequest.send({} , {} , {
                url:redirect_message,
                data:info.raw,
                method:'POST',
                done:function(a){
                    if(!a.data){
                        info.noReply = true;
                    }
                    next(null , a.data);
                }
            })
        }
    },
    get:function(channel){
        return webots[channel];
    }
}