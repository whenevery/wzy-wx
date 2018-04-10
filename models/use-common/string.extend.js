module.exports = function(obj){
    if(obj){
        /*
         * 在字符串前 插入(非重复插入)
         * str 需要操作的字符串
         * split 插入符号
         * */
        obj.unShift = function(str , split){
            str = str || '';
            split = split || '/';
            if(str.indexOf(split) == 0){
                return str;
            }
            return split + str;
        };
        /*
         * 在字符串前 插入(非重复插入)
         * str 需要操作的字符串
         * split 插入符号
         * */
        obj.stringConcatOnce = function(str , split){
            str = str || '';
            split = split || '/';
            if(str.indexOf(split) == str.length -1){
                return str;
            }
            return str + split;
        };
        /*
         *在前补全字符串
         * */
        obj.stringPadStart = function(str , len , split){
            if(str == null)str = '';
            str += '';
            if(str.length > len)return str;
            var _len = len - str.length;
            return Array(_len + 1).join(split).slice(0 , _len) + str;
        };
        /*
         *在后补全字符串
         * */
        obj.stringPadEnd = function(str , len , split){
            if(str == null)str = '';
            str += '';
            if(str.length > len)return str;
            var _len = len - str.length;
            return  str + Array(_len + 1).join(split).slice(0 , _len);
        };
        /*
         *生成随机code
         * len生成长度  默认4
         * type 0 数字  1字母 2 数字字母组合 默认0
         * */
        obj.stringRandom = function(len , type){
            if(isNaN(len) || !len || len < 0)len = 4;
            if(isNaN(type) || !type || type < 0)type = 0;
            var arrs = [
                '123456890',
                'qwertyuiopasdfghjklzxcvbnm',
                '123456789qwertyupasdfghjkzxcvbnm'//数字字母组合时  去掉 数字(1 0) 字母(O I l) 以防混淆不好辨认
            ];
            var randomStr = arrs[type];
            var rt = '';
            for(var i=0;i<len;i++){
                rt += randomStr[Math.random() * randomStr.length | 0];
            }
            return rt;
        };
        /*
         *获取渠道channel
         * */
        obj.getChannelByReq = function(req){
            return (req.baseUrl + req.path).split('/')[1];
        };
        /*
         *变成金额显示字符串
         * */
        obj.toMoneyString = function(num){
            var str = '';
            if(num > 1e4){
                str += Math.floor(num / 1e4) + '万';
            }
            num %= 1e4;
            if(num > 1e3){
                str += Math.floor(num / 1e3) + '千';
            }
            num %= 1e3;
            if(num){
                str += num;
            }
            return str;
        };
        obj.resetImgUrl = function(url){
            url += '';
            return url.replace(/^http(s)?:/,'')
        };
        obj.getCookieData = function(str){
            var rt = {};
            if(str)str.split('; ').forEach(function(a){
               var arr = a.split('=');
                rt[arr[0]] = arr[1];
            });
            return rt;
        };
        obj.serialize = function(data){
            var str = '';
            for(var key in data){
                var o = data[key];
                if(o != null){
                    if(str)str+='&';
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(o);
                }
            }
            return str;
        };
        obj.concatImgUrl = function(url){
            if(/^http/.test(url))return url;
            return useConfig.get('apiImgUrl') + url;
        };
        obj.addUrlParam = function(url , param){
            if(typeof param === 'object'){
                param = obj.serialize(param);
            }
            url += /\?/.test(url)?'&':'?';
            return url += param;
        };

        obj.SHA1 = function(__){
            var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
            var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
            function hex_sha1(s) {
                return binb2hex(core_sha1(AlignSHA1(s)));
            }
            function sha1_vm_test() {
                return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
            }
            function core_sha1(blockArray) {
                var x = blockArray; // append padding
                var w = Array(80);
                var a = 1732584193;
                var b = -271733879;
                var c = -1732584194;
                var d = 271733878;
                var e = -1009589776;
                for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
                {
                    var olda = a;
                    var oldb = b;
                    var oldc = c;
                    var oldd = d;
                    var olde = e;
                    for (var j = 0; j < 80; j++) // 对每个512位进行80步操作
                    {
                        if (j < 16)
                            w[j] = x[i + j];
                        else
                            w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                        var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                        e = d;
                        d = c;
                        c = rol(b, 30);
                        b = a;
                        a = t;
                    }
                    a = safe_add(a, olda);
                    b = safe_add(b, oldb);
                    c = safe_add(c, oldc);
                    d = safe_add(d, oldd);
                    e = safe_add(e, olde);
                }
                return new Array(a, b, c, d, e);
            }
            function sha1_ft(t, b, c, d) {
                if (t < 20)
                    return (b & c) | ((~b) & d);
                if (t < 40)
                    return b ^ c ^ d;
                if (t < 60)
                    return (b & c) | (b & d) | (c & d);
                return b ^ c ^ d; // t<80
            }
            function sha1_kt(t) {
                return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
            }
            function safe_add(x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }
            function rol(num, cnt) {
                return (num << cnt) | (num >>> (32 - cnt));
            }
            function AlignSHA1(str) {
                var nblk = ((str.length + 8) >> 6) + 1,
                    blks = new Array(nblk * 16);
                for (var i = 0; i < nblk * 16; i++)
                    blks[i] = 0;
                for (i = 0; i < str.length; i++)
                    blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
                blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
                blks[nblk * 16 - 1] = str.length * 8;
                return blks;
            }
            function binb2hex(binarray) {
                var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                var str = "";
                for (var i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
                }
                return str;
            }
            return hex_sha1(__);
        }
        obj.isSqlKey = function(str){
            return str.indexOf('_')>=0;
        };
        obj.turnSqlKey = function(str){
            return str.replace(/[^_]+/g,function(a,i){
                return i?a.replace(/./g,function(b,j){return j?b:b.toUpperCase()}):a;
            }).replace(/_/g,'');
        };
        obj.turnSqlUpdateKey = function(str){
            return str.replace(/[A-Z]+/g,function(a){
                return '_'+a.toLowerCase();
            });
        };
        obj.turnQueryValue = function(str){
            if(!str || typeof  str !== 'string')return str;
            return str.replace(/['"`]/g,function(a){
                return '\\'+a;
            });
        };
    }

};
