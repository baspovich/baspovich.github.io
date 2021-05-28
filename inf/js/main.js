
jQuery(document).ready(function($) {

	/* Open menu */
	$('.menu-mobile').on('click', function() {
		$('.header__links').slideDown(500);
		$('.close--mobile').slideDown(200);
		$('body').css({'overflow': 'hidden'});
	})
	$('.close--mobile').on('click', function() {
		$('.header__links').slideUp(500);
		$(this).delay(400).slideUp(100);
		$('body').css({'overflow': 'auto'});
	})


	$('.header__links a').on('click', function() {
		if ($(window).width() <= '679'){
			$('.header__links').slideUp(500);
			$('.close--mobile').delay(400).slideUp(100);
			$('body').css({'overflow': 'auto'});
		};
	});

	$(window).resize(function() {
		if ($(window).width() >= '680'){
			$('.header__links').slideDown(500);
		}
	});
	/* // Open menu */

	/* Load more btn */
	var count = 0;
	$('.load-more-btn').on('click', function() {
		count++;
		$('.load-more-' + count).slideDown(800);

		if (count == 3) {
			$(this).fadeOut(500); // Скрывать кнопку
		}
	});

	/* // Load more btn */
});


