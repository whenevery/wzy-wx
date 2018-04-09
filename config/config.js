module.exports = {
    port:3030,
  autoWechatChannel:'wx',
    "log4js":{
        "customBaseDir" :"/logs/",
        "customDefaultAtt" :{
            "type": "dateFile",
            "absolute": true,
            "alwaysIncludePattern": true
        },
        "appenders": [
            {"type": "console", "category": "console"},
            {"pattern": "debug/yyyyMMdd.log", "category": "logDebug"},
            {"pattern": "info/yyyyMMdd.log", "category": "logInfo"},
            {"pattern": "warn/yyyyMMdd.log", "category": "logWarn"},
            {"pattern": "err/yyyyMMdd.log", "category": "logErr"}
        ],
        "replaceConsole": true,
        "allConsole":true,
        "levels":{ "logDebug": "DEBUG", "logInfo": "DEBUG", "logWarn": "DEBUG", "logErr": "DEBUG"}
    },
    wechatOptions:{
        test:{
          "appId":"wxeb6eb417838ef115",
          "appSecret":"d4624c36b6795d1d99dcf0547af5443d",
          "redirect_uri":"http://127.0.0.1",
          "redirect_path":"/wechat/entrance",
          "token":"f4da9eb443e5595cb889a2ff8ec5de8f"
        },
        wx:{
          "appId":"wxfb9a2e6410970db7",
          "appSecret":"373b74bbdb5c7c9fe3dc2c2b235aaa2e",
          "redirect_uri":"http://wx.sail77.com",
          "redirect_path":"/wechat/entrance",
          "redirect_message":'http://wx.sail77.com/wechat/message',
          "token":"f4da9eb443e5595cb889a2ff8ec5de8f"
        },
        smallwzy:{
          "appId":"wxa20361bee07c9a84",
          "appSecret":"10069d76d223324d9631e2d7e46cdeaa",
        }
    },
    mysqlOptions:{
        host:'45.75.2.21',
        user:'root',
        password :'wzy20160529',
        database :'wzy'
    }
};

