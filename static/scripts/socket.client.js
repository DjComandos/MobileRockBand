(function() {
    window.mrb = window.mrb || {
        channels: [],
        CHANNEL_MAX: 20
    }

    window.addEventListener('load', function (document) {
        var i
          , soundsSoc;

        /*
          Append sounds to page for preloading
         */
        $.getJSON("/sound/sounds.json", function(data){
            var body = $('body');
            data.forEach(function(instrument){
                var type = instrument.type
                  , path = instrument.path;
                instrument.tones.forEach(function(tone){
                    body.append('<audio id="sound-' + type + '-' + tone + '" src="sound/' + path + '/' + tone + '.mp3" preload="auto"></audio>');
                });
            });
        });

        /*
          Initialize channels for sound
         */
        for(i=0; i < mrb.CHANNEL_MAX; i++){
            mrb.channels[i] = {
                track:  new Audio(),
                finished: -1
            };
        }

        window.mrb.playSound = window.mrb.playSound || function (type, tone) {
            var i
                , current_time = (new Date()).getTime();

            for (i = 0; i < mrb.CHANNEL_MAX; i++) {
                var channel = mrb.channels[i];
                if (channel.finished < current_time) {
                    var element = window.document.getElementById('sound-' + type + '-' + tone);
                    channel.finished = current_time + element.duration * 1000;
                    channel.track.src = element.src;
                    channel.track.load();
                    channel.track.play();
                    break;
                }
            }
        }

        soundsSoc = io.connect('/sounds');

        soundsSoc.on('play',function(data){

        });

        $.getJSON("/sound/sounds.json", function(data){
            var conrainer = $('body');
            data.forEach(function(instrument){
                var type = instrument.type
                    , path = instrument.path;
                instrument.tones.forEach(function(tone){
                    conrainer.append('<button onclick="mrb.playSound(\''+type+'\', \''+ tone +'\')">'+type+' : '+tone+'</button>');
                });
                conrainer.append('<br />');
            });
        });

    });

})();
