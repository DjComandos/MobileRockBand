(function ($) {

$.fn.recorder = function(settings){

	return $(this).each(function (i, e){
		
		$(this).click(function (){
			var el = $(this);
			if(el.hasClass('recording')) {
				el.attr('class', 'recorder recorded');
				// stop recording
				window.isRecording = false;
			} else if(el.hasClass('recorded')){
				el.attr('class', 'recorder playing');
				// play recorded sound
				window.mrb.playRecordedSound();
			} else if (el.hasClass('playing')) {
				el.attr('class', 'recorder');
				//stop playing recorded sound - and clear info
				window.recorded = [];
			} else {
				el.attr('class', 'recorder recording');
				// start recording
				window.isRecording = true;
				window.recorded = [];
			}
		});
	});
};

})($ || jQuery);