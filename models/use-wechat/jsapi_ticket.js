var JSAPI_TICKET = {};
module.exports = function(channel , call){
    var ticket = JSAPI_TICKET[channel];
    if(ticket && ticket.expires_in - 10 > (new Date - ticket.createTime)/1000){
        call && call(ticket);
        return;
    }
    console.log(channel);
    useWechat.jsToken(channel , function(ACCESS_TOKEN){
        useRequest.send(null , null ,{
            url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ACCESS_TOKEN.access_token+'&type=jsapi',
            done:function(data){
                if(data.ticket){
                    JSAPI_TICKET[channel] = data;
                    JSAPI_TICKET[channel].createTime = Date.now();
                }
                call && call(JSAPI_TICKET[channel]);
            }
        })
    });
};