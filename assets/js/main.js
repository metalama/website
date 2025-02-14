/*
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
*/
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
          // Mouse enter: hide other dropdowns then show the current one.
          var submenuId = $(this).find("a").attr("data-submenu");
          $(".dropdownmenu").not("#" + submenuId).stop(true, true).hide();
          $("#" + submenuId).stop(true, true).show();
      },
      function (e) {
          // Mouse leave: hide dropdown immediately unless entering the dropdown area.
          if ($(e.relatedTarget).closest(".has-dropdownmenu, .dropdownmenu").length) {
            return;
          }
          var submenuId = $(this).find("a").attr("data-submenu");
          $("#" + submenuId).stop(true, true).hide();
      }
  );

  // Keep the dropdown visible when hovering over it.
  $(".dropdownmenu").hover(
      function (e) {
          $(this).stop(true, true).show();
      },
      function (e) {
          // Hide dropdown immediately unless moving into the parent menu.
          if ($(e.relatedTarget).closest(".has-dropdownmenu, .dropdownmenu").length) {
            return;
          }
          $(this).stop(true, true).hide();
      }
  );
});

// Track the active section in the right nav.
$(document).ready(function () {
  var $navLinks = $("nav.right-nav a");

  function onScroll() {
    var currentSectionId = "";
    var minDistance = Infinity;

    $navLinks.each(function () {
      var $link = $(this);
      var targetId = $link.attr("href").replace(/^#/, "");
      var $target = $("#" + targetId);
      if ($target.length) {
        var rect = $target[0].getBoundingClientRect();
        if (rect.top >= 0 && rect.top < minDistance) {
          minDistance = rect.top;
          currentSectionId = targetId;
        }
      }
    });

    $navLinks.parent().removeClass("active");

    if (currentSectionId) {
      $("nav.right-nav a[href='#" + currentSectionId + "']").parent().addClass("active");
    }
  }

  $(window).on("scroll", onScroll);
  onScroll();
});
