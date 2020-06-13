$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/down.svg" class="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/down.svg" class="prev"></button>'
    });
  });