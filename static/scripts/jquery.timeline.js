(function( $ ) {

    $.fn.timeline = function( method ) {

        var methods = {

            init: function( options ){

                options = $.extend({ speed: 20 }, options);

                var container = $(this);

                setInterval(function() {
                    container.find('span').css({ left: '-=1' }).each(function(){
                        var pos = $(this).offset();
                        if (pos.left < 0 ) $(this).remove();
                    })
                }, options.speed );

                return this;
            },

            add: function(){

                $(this).each(function(){

                    var item = $('<span>').appendTo( $(this) );
                    item.css({ left: $(this).width() -  item.width() }).fadeIn();
                });

                return this;
            },

            story: function( options ){

                options = $.extend({ speed: 12000 }, options);

                var container = $(this);
                var event = function() {

                    var date = new Date();

                    var hour = date.getHours();
                    var mins = date.getMinutes();
                    var secs = date.getSeconds();

                    var line = $('<span>').addClass('line').appendTo(container);
                    var text = $('<span>')
                        .text( (hour < 10 ? '0'+hour:hour) +':'+
                               (mins < 10 ? '0'+mins:mins) +':'+
                               (secs < 10 ? '0'+secs:secs) )
                        .appendTo(container);

                    var c_width = $(this).width();
                    var t_width = text.width();
                    var l_width = line.width();

                    text.css({ left: c_width -  t_width }).fadeIn();
                    line.css({ left: c_width -  t_width - l_width }).fadeIn();

                };

                setInterval(event, options.speed );
                event();
            }
        };

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.timeline' );
        }
    };

})( jQuery );