window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.nav__btn'),
  menuItem = document.querySelectorAll('.nav__link'),
  hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger_active');
      menu.classList.toggle('nav__btn_active');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('hamburger_active');
          menu.classList.toggle('nav__btn_active');
      })
  })
})

$(document).ready(function(){
    $('.comp__slider').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });
  });

$(document).ready(function(){
    $('ul.tittle__tabs').on('click', 'li:not(.tittle__tab_active)', function() {
        $(this)
          .addClass('tittle__tab_active').siblings().removeClass('tittle__tab_active')
          .closest('div.container').find('div.works__wrapper').removeClass('works__wrapper_active').eq($(this).index()).addClass('works__wrapper_active');
    });
});

$('.nav__link').on( 'click', function(){ 
  const el = $(this);
  const dest = el.attr('href'); // получаем направление
  if(dest !== undefined && dest !== '') { // проверяем существование
      $('html').animate({ 
          scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
      }, 500 // скорость прокрутки
      );
  }
  return false;
});

