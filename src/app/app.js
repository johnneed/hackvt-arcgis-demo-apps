$(document).ready(function () {
	var mobileMenu = $('#content');
	$('#hamburger').click(function () {
		$(this).toggleClass('open');
		mobileMenu.toggleClass('is-menu-open');
	});
});