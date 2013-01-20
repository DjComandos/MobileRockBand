(function() {
    window.mrb = window.mrb || {
        channels: [],
        CHANNEL_MAX: 20
    }

    window.addEventListener('load', function (document) {
        var i
          , socket;

        /*
          Append sounds to page for preloading
         */
        $.getJSON("/sound/sounds.json", function(data){
            var body = $('body');
            data.forEach(function(instrument){
                var type = instrument.type.substring(0,2)
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

            $( '.equalizer.' + type ).equalizer('up');
            $('.timeline.' + type ).timeline('add');

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

        socket = io.connect('/sounds');

        socket.on('play', function(data){

            mrb.playSound(data.i, data.t);
        });

        $.getJSON("/sound/sounds.json", function(data){
            var conrainer = $('.debug');
            data.forEach(function(instrument){
                var type = instrument.type.substring(0,2)
                    , path = instrument.path;

                var group = $('<div>').addClass('btn-group');
                instrument.tones.forEach(function(tone){
                    group.append('<button class="btn" onclick="mrb.playSound(\''+type+'\', \''+ tone +'\')">'+tone+'</button>');
                });
                conrainer.append(group).append('<br><br>');
            });
        });

        $('.equalizer.pi').equalizer({ seed: 700 });
        $('.equalizer.gu').equalizer({ seed: 800 });
        $('.equalizer.dr').equalizer({ seed: 600 });

        $('.timeline,.timestory').timeline();
        $('.timestory').timeline('story');
    });

})();
