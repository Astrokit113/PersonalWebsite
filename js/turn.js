$(document).ready(function() {
  // Initialize turn.js using the Cover1 image natural size.
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
        autoCenter: false,
        gradients: true,
        duration: 600,
        elevation: 50
      });

      // Tell the pages and images to fluidly fill the book, no matter what size it shrinks to!
      $flipbook.find('.page-container, .page-background').css({
          width: '100%', 
          height: '100%',
          'object-fit': 'contain'
      });

      // Tag wrappers for transform-origin (spine)
      setTimeout(function(){
        $flipbook.find('.page-wrapper').each(function(){
          var $wr = $(this);
          var left = $wr.position().left;
          if (left <= 1) { $wr.addClass('left').removeClass('right'); }
          else { $wr.addClass('right').removeClass('left'); }
        });
        $('.page-wrapper.left').css('transform-origin','left center');
        $('.page-wrapper.right').css('transform-origin','right center');
      }, 120);

      /* =======================================================
         NEW RESPONSIVE & SINGLE-PAGE LOGIC
         ======================================================= */
      function resizeFlipbook() {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();

        if (screenWidth <= 800) {
          // 1. Switch to single page mode
          $flipbook.turn("display", "single");

          // 2. Calculate a responsive size that fits the phone screen
          var margin = 40; // Leaves 20px padding on left and right
          var boundWidth = screenWidth - margin;
          var boundHeight = screenHeight - (margin * 2);

          // Aspect ratio of a SINGLE page
          var ratio = pageW / h;

          var newW = boundWidth;
          var newH = newW / ratio;

          // If scaling by width makes it too tall, scale by height instead
          if (newH > boundHeight) {
            newH = boundHeight;
            newW = newH * ratio;
          }

          // 3. Apply the perfectly calculated size natively
          $flipbook.turn("size", Math.floor(newW), Math.floor(newH));

        } else {
          // 1. Switch back to double page mode on desktop
          $flipbook.turn("display", "double");

          // 2. Reset to the original full size
          $flipbook.turn("size", bookW, h);
        }
      }

      // Re-calculate the math every time the user rotates their phone or drags the window
      $(window).on('resize', function() {
          resizeFlipbook();
      });
      
      // Run it immediately on load
      resizeFlipbook();
      /* ======================================================= */

    } catch (e) {
      // Fallback
      var $flip = $("#flipbook");
      var bookW = (w === 514) ? 1028 : w*2;
      var pageW = Math.floor(bookW/2);
      $flip.css({width: bookW + 'px', height: h + 'px'});
      $flip.find('.page-container').css({width: pageW + 'px', height: h + 'px'});
    }
  };
  
  img.onerror = function(){
    $('#flipbook').turn({
      width: 514,
      height: 800,
      display: 'single',
      autoCenter: false,
      elevation: 50
    });
  };
});