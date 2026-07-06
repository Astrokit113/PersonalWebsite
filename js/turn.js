$(document).ready(function() {
  // Initialize turn.js using the Cover1 image natural size.
  var coverPath = '../../images/Cover1.png';
  var img = new Image();
  img.src = coverPath;
  img.onload = function() {
    var w = img.naturalWidth || 514;
    var h = img.naturalHeight || 800;

    // Initialize book as double-page so each page equals 514x800 (book width 1028)
    try {
      var bookW = (w === 514) ? 1028 : w*2; // if cover width is single page 514, book is 1028
      var pageW = Math.floor(bookW / 2);
      $("#flipbook").turn({
        width: bookW,
        height: h,
        display: 'double',
        autoCenter: false,
        gradients: true,
        duration: 600
      });

      // Ensure page containers match the page size (each page = half book width)
      $("#flipbook").find('.page-container').css({width: pageW + 'px', height: h + 'px'});

      // Ensure images inside pages don't stretch: set to exact page size
      $("#flipbook").find('.page-background').css({width: pageW + 'px', height: h + 'px', 'object-fit':'contain'});

      // Tag wrappers for transform-origin (spine) after a short delay
      setTimeout(function(){
        $('#flipbook').find('.turn-page-wrapper').each(function(){
          var $wr = $(this);
          var left = $wr.position().left;
          if (left <= 1) { $wr.addClass('left').removeClass('right'); }
          else { $wr.addClass('right').removeClass('left'); }
        });
        // set transform-origin CSS for spine flipping
        $('.turn-page-wrapper.left').css('transform-origin','left center');
        $('.turn-page-wrapper.right').css('transform-origin','right center');
      }, 120);
    } catch (e) {
      // Fallback: set sizes via CSS if turn.js initialization fails
      var $flip = $("#flipbook");
      var bookW = (w === 514) ? 1028 : w*2;
      var pageW = Math.floor(bookW/2);
      $flip.css({width: bookW + 'px', height: h + 'px'});
      $flip.find('.page-container').css({width: pageW + 'px', height: h + 'px'});
    }
  };
  // If image fails to load, initialize with default single page size
  img.onerror = function(){
    $('#flipbook').turn({width:514, height:800, display:'single', autoCenter:false});
  };
});