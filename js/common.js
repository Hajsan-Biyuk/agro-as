$(document).ready(function () {

	var $menu = $('.header');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50 && $menu.hasClass('default')) {
			$menu.removeClass('default').addClass('fixed');
		} else if ($(this).scrollTop() <= 50 && $menu.hasClass('fixed')) {
			$menu.removeClass('fixed').addClass('default');
		}
	});

	if ($(window).scrollTop() > 50 && $menu.hasClass('default')) {
		$menu.removeClass('default').addClass('fixed');
	}

	$('.sandwich').click(function () {
		if ($('.menu-mobile').is(':hidden')) {
			$('.menu-mobile').slideDown(200);
			$('.sandwich').addClass('active');
			$('body').addClass('body--menu');
			$('.menu-overlay').fadeIn(200);
		} else {
			$('.menu-mobile').slideUp(200);
			$('.sandwich').removeClass('active');
			$('body').removeClass('body--menu');
			$('.menu-overlay').fadeOut(200);
		}
	});

	$('.menu-overlay').click(function () {
		$('.menu-mobile').slideUp(200);
		$('.sandwich').removeClass('active');
		$('body').removeClass('body--menu');
		$('.menu-overlay').fadeOut(200);
	});

	$('.menu-mobile a').click(function () {
		if ($(window).width() < 992) {
			$('.menu-mobile').slideUp(200);
			$('.sandwich').removeClass('active');
			$('body').removeClass('body--menu');
			$('.menu-overlay').fadeOut(200);
		}
	});

	$('.item-question__head').click(function () {
		var $item = $(this).closest('.item-question');
		if ($item.hasClass('active')) {
			$item.removeClass('active');
			$item.find('.item-question__answer').slideUp(200);
		} else {
			$('.item-question').removeClass('active');
			$('.item-question__answer').slideUp(200);
			$item.addClass('active');
			$item.find('.item-question__answer').slideDown(200);
		}
	});

	var productsSliderResizeTimer;

	function initProductsSlider() {
		var $slider = $('.products__slider');
		var windowWidth = $(window).width();

		if ($slider.hasClass('slick-initialized')) {
			$slider.slick('unslick');
		}

		if (windowWidth < 1400) {
			$slider.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
				dots: false,
				touchThreshold: 12,
				variableWidth: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							dots: true
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							dots: true
						}
					}
				]
			});
		}
	}

	initProductsSlider();

	$(window).on('resize', function () {
		clearTimeout(productsSliderResizeTimer);
		productsSliderResizeTimer = setTimeout(initProductsSlider, 150);
	});

	$('.fancybox').fancybox({
		autoFocus: false,
		backFocus: false,
		afterShow: function (instance, current) {
			if (current && current.$content) {
				current.$content.find('.input-phone').mask('+7 (999) 999-99-99');
			}
		}
	});

	$('.input-phone').mask('+7 (999) 999-99-99');

	function getAnchorOffset() {
		var gap = 16;
		var $header = $('.header');
		if ($header.hasClass('fixed')) {
			return $header.outerHeight() + gap;
		}
		var $row = $header.find('.header__row');
		if ($row.length) {
			return $row.outerHeight() + 30 + gap;
		}
		return $header.outerHeight() + gap;
	}

	$('a[href^="#"]').on('click', function (event) {
		var href = $(this).attr('href');
		if (!href || href === '#' || href.length < 2) {
			return;
		}
		if ($(this).hasClass('fancybox') || $(this).closest('.tabs-page').length) {
			return;
		}
		var $target = $(href);
		if (!$target.length) {
			return;
		}
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $target.offset().top - getAnchorOffset()
		}, 500);
	});

});
