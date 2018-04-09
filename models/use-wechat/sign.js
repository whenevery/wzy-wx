function sign(data){
    var keys = Object.keys(data);
    keys.sort(function(a , b){
       var ai,bi;
        for(var i=0;;i++){
           if(ai=a.charAt(i)){
               if(bi=b.charAt(i)){
                   if(ai == bi)continue;
                  return ai.charCodeAt() - bi.charCodeAt();
               }else{
                   return 1;
               }
           }else{
               return -1;
           }
       }
    });
    var str = '';
    keys.forEach(function(o , i){
        if(data[o]){
            if(str) str += '&';
            str += o + '=' + (data[o]);
        }
    });
    return str;
}
sign.jsticket = function(JSAPI_TICKET,url ){
    var timestamp = Date.now();
    var nonceStr = useCommon.stringRandom(10,2);
    var jsapi_ticket = JSAPI_TICKET.ticket;
    var shaStr = 'jsapi_ticket='+jsapi_ticket+'&noncestr='+nonceStr+'&timestamp='+timestamp+'&url='+url;
    return {
        timestamp:timestamp,
        signType:'SHA1',
        nonceStr:nonceStr,
        sign:useCommon.SHA1(shaStr)
    };
};
module.exports = sign;