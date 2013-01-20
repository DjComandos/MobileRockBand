$(document).ready(function(){

    window.addEventListener('load', function (document) {

        var server = io.connect('/instruments');
        var instrument = $('body').attr('data-instrument');
        var isMouseDown = false;
        var strings = {};

        function timerStep(id, $element){
            console.log('111');
        };

        function play($element) {
            isMouseDown = true;
            var id = $element.attr('id');
            server.emit('play', { 'i': instrument, 't': id } );

            $element.addClass('active');
          //  strings[id] = strings[id] || {};
          //  strings[id].step = 1;
/*
            setTimeOut(function(){
                timerStep(id, $element);
            }, 250);/**/
        };

        $('.button')
            .bind('mousedown touchstart', function(){
                play($(this));
            })
            .bind('mouseup touchend', function(){
                isMouseDown = true;
                $(this).removeClass('active');
            })
            .bind('vmouseover', function(){
                if(isMouseDown) {
                    $(this).addClass('active');
                    play($(this));
                }
            });

    });

    // hack for mobile orientation
    $(window).bind('orientationchange', function(e, onready){
    if(onready){
        $(document.body).addClass('portrait-onready');
    }
    if (Math.abs(window.orientation) != 90){
        $(document.body).addClass('portrait');
    } 
    else {
        $(document.body).removeClass('portrait').removeClass('portrait-onready');
    }
    });

});
