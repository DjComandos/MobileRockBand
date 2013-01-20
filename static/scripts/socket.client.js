(function() {
    window.recorded = [];
    window.start_time = undefined;
    window.isRecording = false;
    window.index = 0;

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

        function stopPlayRecorded(){
            $('.recorder').attr('class', 'recorder');
            recorded = [];
            index = 0;
            start_time = undefined;
        }

        function playNextSavedSound(){
            if(!!recorded && recorded.length > index) {
                try {
                    var current = recorded[index++];
                    setTimeout(function(){
                        window.mrb.playSound(current.type, current.tone);
                        playNextSavedSound();   
                    }, current.delay);
                } catch(e) {
                    recorded = [];
                    index = 0;
                    stopPlayRecorded();
                }
            } else {
                stopPlayRecorded();
            }
        }

        window.mrb.playRecordedSound = window.mrb.playRecordedSound || function (){
            index = 0;
            playNextSavedSound();
        };

        window.mrb.playSound = window.mrb.playSound || function (type, tone) {
            var i,
                current_time = (new Date()).getTime();

            if(window.isRecording){
                start_time = start_time || (new Date()).getTime();
                recorded.push({'type':type, 'tone': tone, 'delay': current_time - start_time});
                start_time = current_time;
            }
            

            $( '.equalizer.' + type ).equalizer('up');
            $('.timeline.' + type ).timeline('add');

            for (i = 0; i < mrb.CHANNEL_MAX; i++) {
                var channel = mrb.channels[i];
                if (channel.finished < current_time) {
                    //statusImages.start(type);
                    var element = window.document.getElementById('sound-' + type + '-' + tone);
                    channel.id = type + tone;
                    channel.finished = current_time + element.duration * 1000;
                    channel.track.src = element.src;
                    channel.track.load();
                    channel.track.play();
                    break;
                }
            }
        }

        window.mrb.stopSound = window.mrb.stopSound || function (type, tone) {

            setTimeout(function(){
                var current_time = (new Date()).getTime();
                for (i = 0; i < mrb.CHANNEL_MAX; i++) {
                    var channel = mrb.channels[i];

                        if ( channel.finished > current_time && channel.id === type + tone ) {
                            console.log(channel.track);

                                channel.track.pause()
                                channel.finished = 0;
                                //statusImages.stop(type);
                            break;
                        }
                }
            }, 500);
        }

        socket = io.connect('/sounds');

        socket.on('play', function(data){
            mrb.playSound(data.i, data.t);
        });

        socket.on('stop', function(data){
            mrb.stopSound(data.i, data.t);
        });

        $.getJSON("/sound/sounds.json", function(data){
            var conrainer = $('.debug').hide();
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
