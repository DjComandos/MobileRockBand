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

});
