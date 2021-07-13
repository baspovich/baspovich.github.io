$(document).ready(function(){
    $('.offer__cards').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendArrows: $('.offer__arrows'),
        prevArrow: `<div class="offer__arrow offer__arrow-left">
        <svg width="17" height="31" viewBox="0 0 17 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2L1.56497 15.435L15 28.8701" stroke="#29327D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
            
    </div>`,
        nextArrow: `<div class="offer__arrow offer__arrow-right">
        <svg width="17" height="31" viewBox="0 0 17 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 29L15.435 15.565L2 2.12994" stroke="#29327D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>							
    </div>`
    });
});