module.exports = function(useData){
    useData.addSubscribe = function(data){
        var openId = data.FromUserName;
        useMysql.searchOne(useSql.common.search('user',{
            openid:openId
        }),function(err , data){
            if(data){
                useMysql.update(useSql.common.update('user',{
                    subscribe:1,
                    subscribe_time:useCommon.parseDate(data.CreateTime * 1000)
                },{openid:openId}))
            }else{
                var channel = useConfig.get('autoWechatChannel');
                useWechat.openidInfo(channel , openId , function(userInfo){
                    if(userInfo.openid)useData.addUser(userInfo );
                })
            }
        });
    };
    useData.unSubscribe = function(data){
        var openId = data.FromUserName;
        useMysql.update(useSql.common.updateAll('user',{
            subscribe:0,
            subscribe_time:null
        },{
            openid:openId,
        }),function(err , data){

        });
    };
    useData.addMessage = function(data){
        this.addSubscribe(data);
    };
    useData.addUser = function(userInfo , call){
        var sendData = {
            openId :userInfo.openid,
            nickname   :userInfo.nickname,
            headImg    :userInfo.headimgurl,
            deviceType:'wx',
            gender :userInfo.gender  || userInfo.sex,
            sType :'weixin',
            uid:userInfo.unionid,
        };
      var addData = {
        openid:userInfo.openid,
        unionid:userInfo.unionid||userInfo.openid,
        nickName:userInfo.nickname,
        headImg:userInfo.headimgurl||userInfo.headimg,
        sex:userInfo.gender||userInfo.sex,
        city:userInfo.city,
        province:userInfo.province,
        country:userInfo.country,
        privilege:userInfo.privilege,
        status:0,
        subscribe:userInfo.subscribe || '',
        subscribe_time:useCommon.parseDate(userInfo.CreateTime * 1000 || new Date)
      };
      if(userInfo.subscribeTime)addData.subscribe_time = useCommon.parseDate(userInfo.subscribeTime * 1000);
      useMysql.add(useSql.common.add('user',addData) , call);
    }
};


