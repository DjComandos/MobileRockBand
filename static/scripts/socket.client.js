(function() {

    window.addEventListener('load', function (document) {

        var sounds = io.connect('/sounds');

        sounds.on('play',function(data){
            alert('echo');
        });

    });

})();
