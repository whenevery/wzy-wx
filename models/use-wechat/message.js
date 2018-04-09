module.exports = function(data , call){
    //ToUserName
    //FromUserName
    //CreateTime
    //MsgType
    //Content
    //MsgId
    //Event
    console.log(data);
    if(data.MsgType === 'event'){
        if(data.Event === 'subscribe'){
            useData.addSubscribe(data);
            call('我是吴致远,欢迎你的到来\n');
            return ;
        }
        if(data.Event === 'unsubscribe'){
            useData.unSubscribe(data);
            call('');
            return ;
        }
        if(data.Event.toLowerCase() === 'view' || data.Event === 'LOCATION'){
            call('');
            return ;
        }
    }
    useData.addMessage(data);
    if(data.MsgType === 'text'){
        if(/订/.test(data.Content)){
            call('亲，目前程序猿们正在加班加点的内测中，即将面世！请留意公众号，也可参与预热活动哦');
        }
    }

    call('你想要玩什么呢？\n'+
        '<a href="http://wx.yukew.com/h5/wine-manner">测试您醉酒后的样子？据说很准哦!</a>\n' +
        '<a href="http://act.yukew.com/vote/view/rule/1">2018我行我秀，娱动全城，赢娱客内测万元大礼包!</a>');
};