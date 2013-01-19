$(document).ready(function(){

    window.addEventListener('load', function (document) {

        var server = io.connect('/instruments');
        var instrument = $('body').attr('data-instrument');

        $('.button')
            .bind('mousedown touchstart', function(){
                $(this).addClass('active');

                server.emit('play', { 'i': instrument, 't': $(this).attr('id') } );
            })
            .bind('mouseup touchend', function(){
                $(this).removeClass('active');
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
