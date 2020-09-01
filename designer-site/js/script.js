$(document).ready(function(){
    $('ul.works__tabs').on('click', 'li:not(.works__tab_active)', function() {
        $(this)
            .addClass('works__tab_active').siblings().removeClass('works__tab_active')
            .closest('div.container').find('div.works__wrapper').removeClass('works__wrapper_1').eq($(this).index()).addClass('works__wrapper_1');
    });
});
    