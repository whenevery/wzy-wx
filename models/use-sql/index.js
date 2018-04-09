var sql = {};
sql.sqlQuery = function(data , split){
    if(typeof data === 'string')return data;
    var arr = [];
    split = split || ' and ';
    for(var key in data){
        var d = data[key];
        if(d == null || d === "")continue;
        if(key === 'startCreateTime'){
            arr.push('create_time>="'+data[key]  + '" ');
            continue;
        }
        if(key === 'endCreateTime'){
            arr.push('create_time<="'+data[key]  + '" ');
            continue;
        }
        var isIn;
        if(key === 'in'){
            isIn = 1;
            d = data[key][1];
            key = data[key][0];
        }
        var query,k=useCommon.turnSqlUpdateKey(key);
        if(k.indexOf('.')>0){
            query = k;
        }else{
            query = '`'+k+'`';
        }
        if(isIn){
            arr.push(query+' in ('+d + ')');
        }else{
            arr.push(query+'="'+useCommon.turnQueryValue(d)+'"');
        }

    }
    var sqlStr = arr.join(split);
    if(!sqlStr.trim())sqlStr = ' 1=1 ';
    return sqlStr;
};
sql.addKey = function(arr){
    arr = arr.map(function(a){
        return '`'+a+'`';
    });
    return arr.join();
};
sql.addValue = function(arr){
    arr = arr.map(function(a){
        return a===Date?'now()':('"'+useCommon.turnQueryValue(a)+'"');
    });
    return arr.join();
};
sql.updateValue = function(data){
    var arr = [];
    for(var i in data){
        if(data[i] !== '' && data[i] != null){
            var str = '`'+useCommon.turnSqlUpdateKey(i)+'`=';
            if(data[i]===Date){
                str+='now()';
            }else{
                str+='"'+(useCommon.turnQueryValue(data[i]))+'"'
            }
            arr.push(str);
        }
    }
    return arr.join();
};
sql.updateAllValue = function(data){
    var arr = [];
    for(var i in data){
        var str = '`'+useCommon.turnSqlUpdateKey(i)+'`=';
        if(data[i]===Date){
            str+='now()';
        }else{
            str+='"'+(data[i] == null?'':useCommon.turnQueryValue(data[i]))+'"'
        }
        arr.push(str);
    }
    return arr.join();
};
require('./common')(sql);
module.exports = sql;