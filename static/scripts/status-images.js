var statusImages = (function(){
	var timersHandlers = {};

	// the dead code
	function onTick(type, $element, max){
		$element.child[].attr('class', timersHandlers[type].count % )
		

		if(--timersHandlers[type].count > 0) {
			setTimeout(function (){
				onTick(type, element);
			}, 250);	
		}

	}

	function start(type){
		console.log(type);
		timersHandlers[type] = timersHandlers[type] || {};
		timersHandlers[type].count = 10;
		setTimeout(function (){
			var $el = $('.status-picture.'+type);
			onTick(type, $el, $el.attr('data-maxvalue'));
		}, 250);
	}

	function stop(type){
		console.log('stop'+type);
	}

	return {
		start: start,
		stop: stop
	};
})();