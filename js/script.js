$(document).ready(function(){
    $('.portfile__slider').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prevArrow.svg" alt="arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/nextArrow.svg" alt="arrow"></button>',
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('[data-modal=btn]').on('click', function() {
        $('.overlay, #modal').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #thanks').fadeOut('slow');
    });

    $('.order__btn').each(function(i) {
        $(this).on('click', function() {
            $('#modal .modal__name').text($('.order__tittle').eq(i).text());
            $('.overlay, #modal').fadeIn('slow');
        })
    });

});

$('.sub-nav__link').on( 'click', function(){ 
    const el = $(this);
    const dest = el.attr('href'); // получаем направление
    if(dest !== undefined && dest !== '') { // проверяем существование
        $('html').animate({ 
            scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
        }, 500 // скорость прокрутки
        );
    }
    return false;
})