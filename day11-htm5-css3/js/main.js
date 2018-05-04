$(document).ready(function() {

	$('.main-menu .elem-head:not(.section-header):not(.no-active)').click(function() {
		$(this).toggleClass('active');
		$('.main-menu .elem-head').not(this).removeClass('active');
	});

});