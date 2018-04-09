module.exports = function(sql){
    sql.common = {
        search:function(tableName , $where){
            return  'select * from `'+tableName+'`' +' where ' +  sql.sqlQuery($where);
        },
        add:function(tableName,data){
            if(!data.createTime && !data.create_time){
                data.create_time = Date;
            }
            if(!data.updateTime && !data.update_time){
                data.update_time = Date;
            }
            var keys = Object.keys(data);
            var values = Object.values(data);
            keys = keys.map(function(a){
                return useCommon.turnSqlUpdateKey(a);
            });
            var addKey = sql.addKey(keys);
            var addValue = sql.addValue(values);
            return 'insert `'+tableName+'` ('+addKey+') values ('+addValue+')';
        },
        update:function(tableName,data , $where){
            if(!data.updateTime && !data.update_time){
                data.update_time = Date;
            }
            var updateValue = sql.updateValue(data);
            return 'update `' + tableName + '` set '+updateValue+' where ' +  sql.sqlQuery($where);
        },
        updateAll:function(tableName,data , $where){
            if(!data.updateTime && !data.update_time){
                data.update_time = Date;
            }
            var updateValue = sql.updateAllValue(data);
            return 'update `' + tableName + '` set '+updateValue+' where ' +  sql.sqlQuery($where);
        },
        count:function(tableName , $where){
            return ' from `'+tableName+'` where ' + sql.sqlQuery($where);
        },
        sum:function(tableName , $where){
            return ' from `'+tableName+'` where ' + sql.sqlQuery($where);
        }
    };
};