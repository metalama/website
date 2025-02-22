var currentLightboxItemId = null;

$(function () {

    $('.lightboxSource li').each(function (index) {
        $(this).attr('data-item', 'lightboxItem' + (index + 1));
    });


    $('#lightboxCarousel').html($('.lightboxSource').html())

    $('#lightboxCarousel li').each(function () {
        $(this).attr('id', $(this).attr('data-item'));
    });


    $('.lightboxSource li, #lightboxCarousel li').click(function () {
        // Load the content.
        $('#lightboxContent').html($(this).html())

        // Set the active item in the carousel.
        $('#lightboxCarousel li').removeClass("active");
        let id = $(this).attr("data-item");
        currentLightboxItemId = id;
        let carouselItem = $('#' + id);
        carouselItem.addClass("active");


        // Show the lightbox.
        $('#lightbox').show();

        // Scroll to set the new item in the middle.
        let carousel = $('#lightboxCarousel');
        carousel.scrollLeft(0);
        let scrollPosition = carouselItem.offset().left - carousel.offset().left - carousel.width() / 2;
        carousel.scrollLeft(scrollPosition);

        // Track an event.
        var img = carouselItem.find('img');
        var alt = img.attr('alt');
        _paq.push(['trackEvent', 'User Page Interaction', 'Lightbox', alt]);

    });

});


function closeLightbox() {
    $('#lightbox').hide();
}

function moveLightbox(direction) {
    let currentItem = $('#' + currentLightboxItemId);
    let newItem = direction > 0 ? currentItem.next() : currentItem.prev();

    if (newItem.length == 0) {
        newItem = direction > 0 ? currentItem.parent().children().first() : currentItem.parent().children().last();
    }

    // Load the content.
    $('#lightboxContent').html(newItem.html())

    // Set the active item in the carousel.
    $('#lightboxCarousel li').removeClass("active");
    let id = newItem.attr("data-item");
    currentLightboxItemId = id;
    let carouselItem = $('#' + id);
    carouselItem.addClass("active");

    // Scroll to set the new item in the middle.
    let carousel = $('#lightboxCarousel');
    carousel.scrollLeft(0);
    let scrollPosition = carouselItem.offset().left - carousel.offset().left - carousel.width() / 2;
    carousel.scrollLeft(scrollPosition);


    // Track an event.
    var img = carouselItem.find('img');
    var alt = img.attr('alt');
    _paq.push(['trackEvent', 'User Page Interaction', 'Lightbox', alt]);

}