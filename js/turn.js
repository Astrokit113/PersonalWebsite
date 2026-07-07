$(document).ready(function() {
  var coverPath = '../../images/Cover1.png';
  var img = new Image();
  img.src = coverPath;
  
  img.onload = function() {
    var w = img.naturalWidth || 514;
    var h = img.naturalHeight || 800;

    try {
      var bookW = (w === 514) ? 1028 : w*2; 
      var pageW = Math.floor(bookW / 2);
      var $flipbook = $("#flipbook");

      $flipbook.turn({
        width: bookW,
        height: h,
        display: 'double',
        autoCenter: false, // Keeps the book perfectly stationary on open/close!
        gradients: true,
        elevation: 50,
        duration: 600
      });

      $flipbook.find('.page-container').css({
          'width': '100%', 
          'height': '100%', 
          'background-color': '#ffffff' 
      });
      $flipbook.find('.page-background').css({
          'width': '100%', 
          'height': '100%', 
          'object-fit': 'contain'
      });

      setTimeout(function(){
        $flipbook.find('.page-wrapper').each(function(){
          var $wr = $(this);
          var left = $wr.position().left;
          if (left <= 1) { $wr.addClass('left').removeClass('right'); }
          else { $wr.addClass('right').removeClass('left'); }
        });
      }, 120);

      /* =======================================================
         NEW FIX: THE LINK SHIELD
         ======================================================= */
      // Stops Turn.js from stealing the initial touch/click on your GIFs
      $flipbook.on('mousedown touchstart pointerdown', 'a', function(e) {
          e.stopPropagation();
      });

      /* =======================================================
         UPGRADED CLICK ZONES
         ======================================================= */
      $flipbook.on("click", function(e) {
        if ($(e.target).closest('a').length > 0) return; // Ignores the click if it was on a GIF

        var rect = $flipbook[0].getBoundingClientRect();
        var clickX = e.clientX - rect.left;
        var currentWidth = rect.width;

        if (clickX < currentWidth * 0.25) {
            if ($flipbook.turn("page") > 1) $flipbook.turn("previous");
        } else if (clickX > currentWidth * 0.75) {
            if ($flipbook.turn("page") < $flipbook.turn("pages")) $flipbook.turn("next");
        }
      });

      /* =======================================================
         THE DYNAMIC ZOOM SCALER
         ======================================================= */
      function resizeFlipbook() {
        if ($('#rotate-device-overlay').is(':visible')) return;

        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var margin = 40; 

        var scaleW = (screenWidth - margin) / bookW;
        var scaleH = (screenHeight - margin) / h;
        
        var scale = Math.min(scaleW, scaleH);

        if (scale > 1) scale = 1;

        $flipbook.turn("size", bookW, h);
        $flipbook.turn("zoom", scale);
      }

      $(window).on('resize', function() { 
          setTimeout(resizeFlipbook, 200); 
      });
      
      resizeFlipbook();

    } catch (e) {
      var $flip = $("#flipbook");
      var bookW = (w === 514) ? 1028 : w*2;
      var pageW = Math.floor(bookW/2);
      $flip.css({width: bookW + 'px', height: h + 'px'});
      $flip.find('.page-container').css({width: '100%', height: '100%'});
    }
  };
  
  img.onerror = function(){
    $('#flipbook').turn({width:1028, height:800, display:'double', autoCenter:false});
  };
});