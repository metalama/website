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
(() => {
	"use strict";
	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
	};
	let bodyUnlock = (delay = 500) => {
		if (bodyLockStatus) {
			setTimeout((() => {
				document.documentElement.classList.remove("lock");
			}), delay);
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	let bodyLock = (delay = 500) => {
		if (bodyLockStatus) {
			document.documentElement.classList.add("lock");
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	function menuInit() {
		if (document.querySelector(".icon-menu")) document.addEventListener("click", (function (e) {
			if (bodyLockStatus && e.target.closest(".icon-menu")) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		}));
	}
	window["FLS"] = true;
	menuInit();
})();
$(document).ready(function () {
	var lastScrollTop = 0;
	var $header = $('header');
	var $spacer = $('.header-spacer');
	var currentSubmenu = null;  // Храним текущее открытое подменю
	function isMobile() {
		return getComputedStyle(document.body).getPropertyValue('--is-mobile').trim() === '1';
	}

	function setHeaderBg(scrollTop) {
		if (scrollTop > 85) {
			$header.css('background', '#130722');
		} else {
			$header.css('background', 'transparent');
		}
	}

	// При загрузке сразу проверяем фон
	setHeaderBg($(window).scrollTop());

	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();

		if (scrollTop > lastScrollTop) {
			$header.removeClass('pinned');
			$spacer.hide();
		} else {
			if (scrollTop > 85) {
				$header.addClass('pinned');
				$spacer.show();
			} else {
				$header.removeClass('pinned');
				$spacer.hide();
			}
		}

		setHeaderBg(scrollTop);
		lastScrollTop = scrollTop;
	});

	$(".has-dropdownmenu").hover(
		function () {
			if (!isMobile()) { // Только для десктопа
				var submenuId = $(this).find("a").data("submenu");

				if (currentSubmenu && currentSubmenu !== submenuId) {
					$("#" + currentSubmenu).stop(true, true).hide();
				}

				$("#" + submenuId).stop(true, true).show();
				currentSubmenu = submenuId;

				setHeaderBg($(window).scrollTop());
			}
		},
		function (e) {
			if (!isMobile()) { // Только для десктопа
				if ($(e.relatedTarget).closest('.dropdownmenu').length === 0) {
					if (currentSubmenu) {
						$("#" + currentSubmenu).stop(true, true).hide();
						currentSubmenu = null;
					}
				}
			}
		}
	);


	$(".dropdownmenu").hover(
		function () {
			$(this).stop(true, true).show();
			setHeaderBg($(window).scrollTop());
		},
		function (e) {
			if ($(e.relatedTarget).closest(".has-dropdownmenu, .dropdownmenu, header").length) return;

			$(this).stop(true, true).hide();
			setHeaderBg($(window).scrollTop());
		}
	);

	var currentSubmenu = null;

	// Клик по ссылке (dropdown3 и dropdown4)
	$(".has-dropdownmenu > a").on("click", function (e) {
		if (isMobile()) {
			var submenuId = $(this).data("submenu");

			// Только если submenuId есть и оно нужное — отменяем переход
			if (submenuId && (submenuId === "dropdown3" || submenuId === "dropdown4")) {
				e.preventDefault();

				var $submenu = $("#" + submenuId);
				var $parentItem = $(this).parent(); // .has-dropdownmenu

				// Закрыть другие и убрать у них класс
				if (currentSubmenu && currentSubmenu !== submenuId) {
					$("#" + currentSubmenu).stop(true, true).slideUp();
					$(".has-dropdownmenu").removeClass("submenu-open");
				}

				// Переключение
				if ($submenu.is(":visible")) {
					$submenu.stop(true, true).slideUp();
					$parentItem.removeClass("submenu-open");
					currentSubmenu = null;
				} else {
					$submenu.stop(true, true).slideDown();
					$parentItem.addClass("submenu-open");
					currentSubmenu = submenuId;
				}

				setHeaderBg($(window).scrollTop());
			}
		}
	});

	// Закрытие по клику вне
	$(document).on("click", function (e) {
		if (isMobile()) {
			if (
				!$(e.target).closest(".has-dropdownmenu").length &&
				!$(e.target).closest(".dropdownmenu").length
			) {
				if (currentSubmenu) {
					$("#" + currentSubmenu).stop(true, true).slideUp();
					$(".has-dropdownmenu").removeClass("submenu-open");
					currentSubmenu = null;
					setHeaderBg($(window).scrollTop());
				}
			}
		}
	});

	// Закрытие при ресайзе
	$(window).on("resize", function () {
		if (!isMobile() && currentSubmenu) {
			$("#" + currentSubmenu).hide();
			$(".has-dropdownmenu").removeClass("submenu-open");
			currentSubmenu = null;
			setHeaderBg($(window).scrollTop());
		}
	});

});

// Track the active section in the right nav.
$(document).ready(function () {
  var $navLinks = $("nav.right-nav a");

  // Scroll 100px under the clicked target instantly to cope with the fixed header.
  $navLinks.on("click", function(e) {
    e.preventDefault();
    var targetId = $(this).attr("href");
    var $target = $(targetId);
    if ($target.length) {
      // Removed animation; perform instant scroll
      $("html, body").scrollTop($target.offset().top - 100);
    }
  });

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

 // Handle the 'show-more' magic.
$(document).ready(function () {
  $('p.show-more').each(function () {
    var $showMorePara = $(this);
    var $nextHeader = $showMorePara.nextUntil('h2, h3, h4'); // All blocks until the next header
    var $link = $('<a class="show-more-link">' + $showMorePara.text() + '</a>'); // Create the hyperlink

    // Hide the blocks
    $nextHeader.addClass('hidden');

    // Replace the paragraph with the hyperlink
    $showMorePara.replaceWith($link);

    // Add a click event to the hyperlink
    $link.on('click', function (e) {
        e.preventDefault();
        $link.hide(); // Hide the link
        $nextHeader.removeClass('hidden'); // Show all hidden blocks
    });
  });
});

// Home page.
$(document).ready(function () {
  // Handle the FAQ section
  $('.faq-section .question').click(function () {
    // Inactivate other questions
    $('.faq-section .question').not(this).removeClass('active');
    $('.faq-section .arrow').not($(this).parent().find('.arrow')).removeClass('arrow-animate');
    $('.faq-section .answer').not($(this).parent().find('.answer')).slideUp(280);

    // Toggle the clicked question
    $(this).toggleClass('active');
    $(this).parent().find('.arrow').toggleClass('arrow-animate');
    $(this).parent().find('.answer').slideToggle(280);
  });

  // Handles the Lottie animation
  if ($('#graphLottie').length) {
    var graphLottieHasStarted = false;
  
    $(window).scroll(function () {
        var top = $('#approach').offset().top;
  
        if ($(window).scrollTop() > (top - 600) && $(window).scrollTop() < (top + 500) && graphLottieHasStarted == false) {
            lottie.loadAnimation({
                container: document.getElementById('graphLottie'),
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '/assets/animations/graph/data.json'
            });
            graphLottieHasStarted = true;
        }
    }).scroll();
  }
});


$(document).ready(function () {
  // Add a top banner if not dismissed
  if (!localStorage.getItem('bannerDismissed')) {
    const banner = $(`
      <div id="preview-banner" style="background: #ffcc00; color: #000; padding: 10px; text-align: center; width: 100%; position: fixed; bottom: 0; z-index: 1000;">
        <span>This website is a preview. It applies to Metalama 2025.1, the first open-source version of Metalama.</span>
        <button id="dismiss-banner" style="margin-left: 10px; background: #000; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Dismiss</button>
      </div>
    `);
    $('body').prepend(banner);
    $('body').css('padding-bottom', '50px'); // Adjust for banner height

    $('#dismiss-banner').on('click', function () {
      $('#preview-banner').remove();
      $('body').css('padding-bottom', '0');
      localStorage.setItem('bannerDismissed', 'true');
    });
  }

  // Handle the 'show-more' magic.
  $('p.show-more').each(function () {
    var $showMorePara = $(this);
    var $nextHeader = $showMorePara.nextUntil('h2, h3, h4'); // All blocks until the next header
    var $link = $('<a class="show-more-link">' + $showMorePara.text() + '</a>'); // Create the hyperlink

    // Hide the blocks
    $nextHeader.addClass('hidden');

    // Replace the paragraph with the hyperlink
    $showMorePara.replaceWith($link);

    // Add a click event to the hyperlink
    $link.on('click', function (e) {
        e.preventDefault();
        $link.hide(); // Hide the link
        $nextHeader.removeClass('hidden'); // Show all hidden blocks
    });
  });
});
