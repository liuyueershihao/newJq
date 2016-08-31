(function(window,underfined){

  window.$ = function (selector,context) {
    return new $.fn.init(selector,context)
  }

  $.fn = $.prototype
  //选择元素后必须返回到$.fn.init才能访问到$.fn里面的方法,且必须保存length
  $.fn.init = function (selector,context) {
    var parent = context || document
    var nodeList = parent.querySelectorAll(selector)
    this.length = nodeList.length
    for(var i=0;i<this.length;i++){
      this[i]=nodeList[i]
    }
    return this
  }

  $.fn.init.prototype = $.fn

  $.extend = $.fn.extend = function (destination,source) {
    if(typeof source === 'undefined') {
      source = destination
      destination = this
    }
    for(var property in source) {
      if(source.hasOwnProperty(property)) {
        destination[property] = source[property]
      }
    }
    return destination
  }

  var reGetThis = function (nodeList, self) {
    for(var i = 0,len = self.length; i < len; i++ ) {
      delete self[i]
    }
    self.length = nodeList.length
    for( i = 0, len = nodeList.length; i < len; i++ ) {
      self[i] = nodeList[i]
    }
    return self
  }
  var deleteThis = function (self) {
    for(var i = 0,len = self.length; i < len; i++ ) {
      delete self[i]
    }
  }
  //每次调用都返回this($.fn.init)，即可达到链式调用的目的
  $.fn.extend({
    each: function (fn) {
      var len = this.length,
      i = 0;
      for( ; i < len; i++ ) {
        fn.call( this[i], i, this[i] )
      }
      return this
    },
    hide: function () {
      this.each(function () {
        this.style.display = 'none'
      })
      return this
    },
    show:function () {
      this.each(function () {
        this.style.display = ''
      })
      return this
    },
    toggle: function () {
      this.each(function () {
        if(this.style.display === 'none') {
          this.style.display = ''
        }else{
          this.style.display = 'none'
        }
      })
      return this
    },
    eq: function (index) {
      var self = index < 0 ? this[this.length + index] :this[index]
      for( var i = 0; i < this.length; i++ ) {
        delete this[i]
      }
      this[0] = self
      this.length = 1
      return this
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    parent: function (selector) {
      var parentNodeList = [],
      arr = [];
      if( selector !== undefined ) {
        arr = $( selector )
        $.toArray( arr )
        for(var n = 0, l = arr.length; n < l; n++ ) {
          this.each(function () {
            if( this.parentNode === arr[n] ){
              parentNodeList.push( arr[n] )
            }
          })
        }
      }else{
        this.each(function () {
          parentNodeList.push( this.parentNode )
        })
      }
      reGetThis( parentNodeList, this )
      return this
    },
    children: function (selector) {
      var childrenNodeList = [],
      arr = [];
      if( selector !== undefined ) {
        arr = $( selector )
        $.toArray( arr )
        for( var n = 0,l = arr.length; n < l; n++ ) {
          this.each(function () {
            if( this === arr[n].parentNode ) {
              childrenNodeList.push( arr[n] )
            }
          })
        }
      }else {
        this.each(function () {
          childrenNodeList = childrenNodeList.concat( $.toArray( this.children ) )
        })
      }

      reGetThis( childrenNodeList, this )

      return this
    },
    hasClass: function (classNameStr) {
      for( var i = 0, len = this.length; i < len; i++ ) {
        if( this[i].className.indexOf( classNameStr ) === -1 ){
          return false
        }
      }
      return true
    },
    removeClass: function (classNameStr) {
      if( this.hasClass( classNameStr ) ) {
        this.each(function () {
          this.className = this.className.replace( classNameStr + " ", "" )
        })
      }else{
        throw new Error( "There is no className named '" + classNameStr + "'")
      }
      return this
    },
    addClass: function (classNameStr) {
      this.each(function () {
        console.log(this)
        if( !this.className ) {
          this.className = ""
          this.className += classNameStr
        }else if (this.className.indexOf( classNameStr ) === -1 ) {
          this.className += " " + classNameStr
        }
        console.log(this.className)
      })
      return this
    },
    on: function (eventName,callback) {
      var len = this.length,
      i = 0;
      this.each(function () {
        this.addEventListener( eventName, callback )
      })
    }
  })

  $.extend({
    isArray: function ( arr ) {
      return Object.prototype.toString.call( arr ) === "[object Array]"
    },
    toArray: function ( arrLike ) {
      return Array.prototype.slice.call( arrLike )
    },
  })

})(window)
