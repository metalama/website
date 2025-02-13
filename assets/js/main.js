var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
});

// Manage the pinned TOC.
$(document).ready(function() {

  var isPinned = false;
  

  function adjustPinned() {    
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition > 600 && !isPinned ) {
        $('.toc_nav').addClass('pinned');
        isPinned = true;
    } else if (scrollPosition < 200 && isPinned ) {
        $('.toc_nav').removeClass('pinned');
        isPinned = false;
    }
  }
  adjustPinned();
  $(window).scroll(function() {
    adjustPinned();    
  });
  
});

// Manages the drop-down menu in the header.
$(document).ready(function () {
  $(".has-dropdownmenu").hover(
      function () {
          // Get the associated dropdown menu using the data-submenu attribute
          var submenuId = $(this).find("a").attr("data-submenu");
          $("#" + submenuId).stop(true, true).slideDown(200); // Show dropdown
      },
      function () {
          var submenuId = $(this).find("a").attr("data-submenu");
          $("#" + submenuId).stop(true, true).slideUp(200); // Hide dropdown
      }
  );

  // Keep the dropdown visible when hovering over it
  $(".dropdownmenu").hover(
      function () {
          $(this).stop(true, true).show();
      },
      function () {
          $(this).stop(true, true).slideUp(200);
      }
  );
});

