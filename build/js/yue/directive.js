;(function(){
    var directive = {

    };
    Yue.directive = function(type , options){
        directive[type.turnKeyUp()] = options;
    };
    Yue.directive.handler = function(el , data , yueModal , cl){
        var yueDirective = el.yueDirective;
        cl = cl || el.yueClone && el.yueClone[0];
        if(cl && yueDirective && yueDirective.length){
            cl.__directiveData = {};
            var baseDirective = yueModal.__baseData.directives;
            yueDirective.forEach(function(a){
                var directiveKey = a.key.slice(2).turnKeyUp();
                if(baseDirective){
                    if(baseDirective[directiveKey]){
                        doHandler(baseDirective[directiveKey] , a , data , cl , yueModal);
                        return;
                    }
                }
                doHandler(directive[directiveKey] , a , data , cl , yueModal);
            });
        }
    };
    function doHandler(handler , directiveData , data , cl , yueModal){
        if(handler){
            requestAnimationFrame(function(){
                var dataValue = {
                    newVal:data.getYueValue(directiveData.val),
                    originVal:directiveData.val,
                    $this:yueModal
                };
                if(!cl.__directiveData[directiveData.key]){
                    handler.insert && handler.insert(cl , dataValue);
                } else{
                    if(JSON.stringify(cl.__directiveData[directiveData.key]) === JSON.stringify(dataValue)){
                        //值没有变化不需要处理
                        return false;
                    }
                    handler.update && handler.update(cl , dataValue);
                }
                handler.done && handler.done(cl,dataValue);
                cl.__directiveData[directiveData.key] = dataValue;
            })
        }
    }
    Yue.directive.die = function(el , cl){
        cl = cl || el.yueClone;
        if(Array.isArray(cl)){
            cl.forEach(function(cl){
                Yue.directive.die(el , cl);
            });
        }
        else if(cl){
            var yueDirective = el.yueDirective;
            if(yueDirective && yueDirective.length){
                yueDirective.forEach(function(a){
                    var handler = directive[a.key];
                    if(handler){
                        handler.die && handler.die(cl);
                    }
                });
            }
        }
    }
})();