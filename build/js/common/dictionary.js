(function(){
  Yue.Dictionary = {
    cache: {
    },
    get: function(code, onSuccess, onFault, onComplete) {
      var _this = this;
      if (!code) {
        onFault && onFault();
        return null;
      }
      var data = _this.cache[code];
      if(data){
        onSuccess && onSuccess(data);
        return data;
      }
      else if(/(\/)|(http)/.test(code)){
        $.get(code,function(a){
          _this.cache[code] = a.data.list || a.data;
          onSuccess && onSuccess(_this.cache[code]);
        });
      }
    },
    text: function(code, value) {
      var _this = this;
      var libarayText = '';
      if (!code || !value) return libarayText;
      if (_this.cache[code]) {
        libarayText = _this.cache[code][value] || '';
      }
      return libarayText;
    },
    load: function($ele , code , call) {
      var that = this;
      this.get(code , function(data){
        $ele.each(function(){
          console.log(data);
          that.loadOption($(this) , data , {
            key:$(this).attr('load-key'),
            val:$(this).attr('load-val'),
          });
        });
        call && call();
      });
    },
    autoLoad:function(call){
      var that = this;
      var ele = $('[data-dictionary]');
      var loadCount = ele.length;
      if(loadCount === 0){
        call && call();
      }
      else ele.each(function(){
        that.load($(this) , $(this).attr('data-dictionary'),function(){
          loadCount -- ;
          if(loadCount === 0){
            call && call();
          }
        });
      });
    },
    loadOption:function($ele , data , options){
      if(!Array.isArray(data))data = useCommon.objectToArray(data);
      if(!data.find(function(a){return a.key === ''}))data.unshift({key:'',value:'全部'});
      $.each(data , function( i , o){
        $ele.append('<option value="' + (o[options.key || 'key']  || o.key || '')+ '">' + ( o[options.val || 'value'] || o.value || '') + '</option>');
      });
    }
  };
})()