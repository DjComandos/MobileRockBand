(function() {

    window.addEventListener('load', function (document) {

        var sounds = io.connect('/sounds');

        sounds.on('play',function(data){
            alert('echo');
        });

        var instruments = io.connect('/instruments');

        instruments.emit('play',{'id':'hello'});

    });



})();
