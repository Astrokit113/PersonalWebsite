/* Minimal turn.js-like plugin to provide basic double-page flipping behaviour
   Supports initialization with {width, height, display, autoCenter} and 'destroy' method.
*/
(function($){
  $.fn.turn = function(arg){
    if (typeof arg === 'string'){
      var method = arg;
      if (method === 'destroy'){
        return this.each(function(){
          var $el = $(this);
          var data = $el.data('_turn');
          if (!data) return;
          $(window).off(data._resizeNs);
          $el.off(data._clickNs);
          $el.removeData('_turn');
          $el.find('.page-container').show().css({position:'static', left:'auto', top:'auto'});
          $el.css({width:'',height:'',position:'static'});
        });
      }
      return this;
    }

    var opts = $.extend({width:1028, height:800, display:'double', autoCenter:false}, arg || {});

    return this.each(function(){
      var $el = $(this);
      var $pages = $el.find('.page-container');
      var total = $pages.length;
      var index = 0;

      // namespaced events for later cleanup
      var ns = '.turnplugin' + Math.random().toString(36).slice(2,8);

      function size(){
        var w = opts.width;
        var h = opts.height;
        // enforce per-page size if display double
        var pw = (opts.display === 'double') ? Math.floor(w/2) : w;
        $el.css({width: w + 'px', height: h + 'px', position: 'relative', overflow: 'hidden'});
        $pages.css({width: pw + 'px', height: h + 'px', position: 'absolute', top: 0, display: 'none'});
        // position pages
        $pages.each(function(i){
          var left = (i % 2 === 0) ? 0 : (pw) + 'px';
          $(this).css({left: left});
        });
      }

      function render(){
        $pages.hide().removeClass('visible');
        for (var i = index; i < index + ((opts.display==='double')?2:1); i++){
          var p = $pages.eq(i);
          if (p.length){ p.show().addClass('visible'); }
        }
      }

      function next(){ if (index + 2 < total) { index += 2; render(); } }
      function prev(){ if (index - 2 >= 0) { index -= 2; render(); } }

      // bind click to advance/back based on click side
      $el.off(ns).on('click'+ns, function(e){
        var rect = $el[0].getBoundingClientRect();
        var x = e.clientX - rect.left;
        if (x > rect.width/2) next(); else prev();
      });

      // keyboard
      $(document).off(ns).on('keydown'+ns, function(e){ if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); });

      // store data for destroy
      $el.data('_turn', {_resizeNs: ns, _clickNs: ns});

      // initial sizing and render
      size();
      render();
    });
  };
})(jQuery);
