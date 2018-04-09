module.exports = {
    login:function(req , res , data , call){
        useRequest.auto(req , res , {
            url:useUrl.login.loginOther,
            data:{
                loginSource:'h5',
                uid:data.unionid || data.uid,
                openId:data.openId,
                sType:'wx'
            },
            method:'POST',
            done:function(a){
                call && call(a);
            }
        })
    }
}