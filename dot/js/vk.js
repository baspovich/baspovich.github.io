jQuery(function ($) {
var arrowLeft = '<svg width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292891 7.2929C-0.097633 7.68342 -0.097633 8.31659 0.292891 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.53841 7.04738 0.53841 6.65685 0.928934L0.292891 7.2929ZM31 7L0.999998 7L0.999998 9L31 9L31 7Z" fill="#AD359E"/></svg>';
  var arrowRight = '<svg width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0V9Z" fill="#AD359E"/></svg>';
  $(".slider").owlCarousel({
    nav:true,
    dots:false,
    loop:false,
    items:1,
    smartSpeed: 1200,
    //animateIn: 'linear',
    //animateOut: 'linear',
    navText: [ arrowLeft, arrowRight ],
  });

  $('a[href*="#"]').on("click", function (event) {
    $('body,html').stop().animate({scrollTop: $(this.hash).offset().top}, 1000);
  });
});