var statusImages = (function(){
	var timersHandlers = {};

	function start(type){
		console.log(type);

	}

	function stop(type){
		console.log('stop'+type);
	}

	return {
		start: start,
		stop: stop
	};
})();