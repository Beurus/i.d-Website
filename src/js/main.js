jQuery(document).ready(onDocReady);

function onDocReady () {
	var $ = jQuery;
	menuToggler();
	fixVHAfterLoad();
	vibrantLoad();
	socialFeed();

	// formhandling.js
	ajaxFeedbackForm();
	hideUpdateFields();
	resetFormLink();
}

function menuToggler () {

	var menuToggle = $('.js-menu-toggle'),
		menu = $('.primary-menu');

	menuToggle.click(function () {
		menu.toggleClass('opened');
		menuToggle.toggleClass('opened');
	});

}

function fixVHAfterLoad() {
	$('.fix-me').height($('.fix-me').height());
}

function vibrantLoad() {
	var img = document.querySelector('.event--page__img');

	if (typeof(img) != 'undefined' && img != null) {
		// Use vibrant to get the swatches
		var vibrant = new Vibrant(img),
			swatches = vibrant.swatches(),
			DarkVibrantHex = swatches['DarkVibrant'].getHex();

		// Remove the current meta tag
		$('meta[name=theme-color]').remove();
		// Create a new meta tag, add the picked color to it and place in head
		var metaTag = $('<meta name="theme-color" content="' + DarkVibrantHex + '">');
		$('head').append(metaTag);

		// Create the style tag with gradient and background color CSS lines
		var styles = "<style> \
			.colorVibrantGradient:before { \
				background-image: linear-gradient( \
					to bottom right," +
					DarkVibrantHex + ", \
					transparent 50% \
				); \
			} .colorVibrant { \
				background: " + DarkVibrantHex + "; \
			} \
		</style>";
		// And add that to the head, too
		$('head').append(styles);
	}
}

function socialFeed(){
	$.ajax({
		type: "GET",
		url: wpjs_object.ajaxurl,
		data: {
			action: 'social_feed_ajax_request'
		},
		success:function(data){
			$('.social__wrapper').html(data);
		},
		error: function(errorThrown){
			console.log('Joe kan de Social feed niet vinden, joe.');
		}
	});
}
