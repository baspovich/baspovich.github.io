/**** Всплывающие окна ****/
jQuery(document).ready(function($) {
  $(function() {
    $(window).trigger('resize');
    /*кнопка отмены*/
    $('.close').on('click', function(){
      $('.modal').modal('hide');
    });
    $('.consultant').on('click', function() {
      $('.modal-call-back').modal('show');
    });
	$('.call-back').on('click', function() {
      $('.modal-call-back').modal('show');
    });
	$('.vopros-project').on('click', function() {
      $('.modal-order-project1').modal('show');
    });
     $('.a-project').on('click', function(){
      $('.modal-order-project1').modal('show');
    });
    $('.btn-mobile_menu').click(function() {
      //$('.header-top').toggleClass('open-menu');
      $('.nav-top').toggleClass('open');
      $('.btn-mobile_menu').toggleClass('open');
    });
  });

  $('a[href^="#menu"]').click( function(){
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top -82}, 500);
    }
    return false;
  });
  $(window).bind('scroll resize', function() {
    var currentSection = null;
    $('.section').each(function(){
      var element = $(this).attr('id');
      if($(window).scrollTop() >= $('#'+element).offset().top - 85)
      {
        currentSection = element;
      }
    });
    $('.home-menu li').removeClass('active').find('a[href="#'+currentSection+'"]').parent().addClass('active');
  });

  /*Перенос js с донера   */
  jQuery('.tabs a').click(function(){
    $this = jQuery(this);
    jQuery('.panel').hide();
    jQuery('.tabs li, .tabs a.active').removeClass('active');
    $this.addClass('active').blur();
    $this.parent().addClass('active')
    var panel = $this.attr('href');
    jQuery(panel).fadeIn(250);
    return false;
  });

  jQuery('.tabs li:first a').click();


 /*скрипт для кнопок + / - */
  $('.my_minus').click(function () {
    var $input = $(this).parent().find('.quant');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.my_plus').click(function () {
    var $input = $(this).parent().find('.quant');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });



  $('.menu-head .parent1 a').each(function () { // получаем все нужные нам ссылки
      var location = window.location.href; // получаем адрес страницы
      var link = this.href; // получаем адрес ссылки
      if(location == link) { // при совпадении адреса ссылки и адреса окна
      $(this).parent().addClass('active'); //добавляем класс
      $('.menu-head .parent1').addClass('active');
      }
  });

  //Валидация форм отправки писем
  $(".form-call-back").validate({
  rules: {
    name: { required: true},
    phone: { required: true},
    email: { required: false},
    message: { required: false},
  },
  messages: {

  },
  errorPlacement: function(error, element) {

  },
  submitHandler: function(form) {
    var forma =$(form);

    $.ajax({
      type: 'POST',
      url: '/sendmessage.php',
      data: forma.serialize(),
      success: function(data) {$('.form-call-back').find('input').val('');
      if(data == "true") {
        $('.modal').modal('hide');
        $('.modal-thank-you').modal('show');
        setTimeout(function(){$('.modal-thank-you').modal('hide')},5000);
      }
    }
  });
  },
  success: function() {

  },
  highlight: function(element, errorClass) {
    $(element).addClass('error');
  },
  unhighlight: function(element, errorClass, validClass) {
    $(element).removeClass('error');
  }

});

$(".form-callback-index").validate({
  rules: {
    name: { required: true},
    phone: { required: true},
    email: { required: false},
    message: { required: false},
  },
  messages: {

  },
  errorPlacement: function(error, element) {

  },
  submitHandler: function(form) {
    var forma =$(form);

    $.ajax({
      type: 'POST',
      url: '/sendmessage.php',
      data: forma.serialize(),
      success: function(data) {$('.form-callback-index').find('input').val('');
      if(data == "true") {
        $('.modal').modal('hide');
        $('.modal-thank-you').modal('show');
        setTimeout(function(){$('.modal-thank-you').modal('hide')},5000);
      }
    }
  });
  },
  success: function() {

  },
  highlight: function(element, errorClass) {
    $(element).addClass('error');
  },
  unhighlight: function(element, errorClass, validClass) {
    $(element).removeClass('error');
  }

});

$(".form-contact-index").validate({
  rules: {
    name: { required: true},
    phone: { required: true},
    email: { required: false},
    message: { required: false},
  },
  messages: {

  },
  errorPlacement: function(error, element) {

  },
  submitHandler: function(form) {
    var forma =$(form);

    $.ajax({
      type: 'POST',
      url: '/sendmessage.php',
      data: forma.serialize(),
      success: function(data) {$('.form-contact-index').find('input').val('');
      if(data == "true") {
        $('.modal').modal('hide');
        $('.modal-thank-you').modal('show');
        setTimeout(function(){$('.modal-thank-you').modal('hide')},5000);
      }
    }
  });
  },
  success: function() {

  },
  highlight: function(element, errorClass) {
    $(element).addClass('error');
  },
  unhighlight: function(element, errorClass, validClass) {
    $(element).removeClass('error');
  }

});//Валидация форм отправки писем

$(".order-project").validate({
  rules: {
    name: { required: false},
    phone: { required: true},
    email: { required: false},
    message: { required: false},
  },
  messages: {

  },
  errorPlacement: function(error, element) {

  },
  submitHandler: function(form) {
    var forma =$(form);

    $.ajax({
      type: 'POST',
      url: '/sendmessage2.php',
      data: forma.serialize(),
      success: function(data) {
        $('.order-project').find('input').val('');
      if(data == "true") {
        $('.modal').modal('hide');
        $('.modal-thank-you').modal('show');
        setTimeout(function(){$('.modal-thank-you').modal('hide')},5000);
      }
    }
  });
  },
  success: function() {

  },
  highlight: function(element, errorClass) {
    $(element).addClass('error');
  },
  unhighlight: function(element, errorClass, validClass) {
    $(element).removeClass('error');
  }
});



});jQuery
