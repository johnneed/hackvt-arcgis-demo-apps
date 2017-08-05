$(document).ready(function () {
	var mobileMenu = $('#content');
	$('#hamburger').click(function () {
		$(this).toggleClass('open');
		$(document.body).toggleClass('is-menu-open');
		mobileMenu.toggleClass('is-menu-open');
	});
});