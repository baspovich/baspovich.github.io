$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/down.svg" class="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/down.svg" class="prev"></button>'
    });
  });

$(document).ready(function(){
    $('.slider_anybtn').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev slick-prev_color"><img src="../icons/down.svg" class="prev"></button>',
        nextArrow: '<button type="button" class="slick-next slick-next_color"><img src="../icons/down.svg" class="prev"></button>'
    });
  });

$('[data-modal=first-layout]').on('click', function() {
  $('.overlay, #first-modal').fadeIn('slow');
  });
$('.modal__close').on('click', function() {
  $('.overlay, #first-modal').fadeOut('slow');
});
