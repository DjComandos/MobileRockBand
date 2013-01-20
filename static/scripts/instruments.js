$(document).ready(function(){

    window.addEventListener('load', function (document) {

        var server = io.connect('/instruments');
        var instrument = $('body').attr('data-instrument');
        var isMouseDown = false;
        var strings = {};

        function timerStep(id, $element){
            $element.removeClass('p0').removeClass('p1').removeClass('p2');
            $element.addClass('p' + +strings[id].step % 3);

            if(--strings[id].step > 0) {

                setTimeout(function(){
                    timerStep(id, $element);
                }, 100);
            } else {
                $element.removeClass('p0').removeClass('p1').removeClass('p2').addClass('p0');
            }
        };

        function play($element) {
            isMouseDown = true;
            var id = $element.attr('id');
            server.emit('play', { 'i': instrument, 't': id } );

            $element.addClass('active');
            if(instrument == 'gu') {
                strings[id] = strings[id] || {};
                strings[id].step = 10;

                setTimeout(function(){
                    timerStep(id, $element);
                }, 250);/**/
            }
        };

        $('.button')
            .bind('touchstart', function(){
                play($(this));
            })
            .bind('mouseup touchend', function(){
                isMouseDown = true;
                $(this).removeClass('active');
            });
            /*.bind('vmouseover', function(){
                if(isMouseDown) {
                    $(this).addClass('active');
                    play($(this));
                }
            });/**/

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
