(function( $ ){

    $.fn.equalizer = function( method ) {

        var methods = {
            init : function( options ) {

                options = $.extend({ deep: 5, seed: 200 }, options);

                var pool = $(this);

                setInterval(function(){
                    pool.each(function(){
                        var range = $(this).attr('data-range');
                        if ( range >= 0) {
                            $(this).find('.'+ range).removeClass('active');
                            $(this).attr('data-range', --range );
                        }
                    });
                }, options.seed);

                return pool.each(function(){

                    var deep = options.deep;
                    while( deep-->0 ) $(this).append($('<span>').attr('class', deep ));

                    $(this).attr('data-deep', options.deep );
                    $(this).attr('data-range', -1 );
                });
            },

            up : function( ) {

                return $(this).each(function(){

                    var deep = $(this).attr('data-deep');
                    var range = $(this).attr('data-range');

                    if ( range < deep ) {
                        $(this).attr('data-range', ++range );
                        do {
                            $(this).find('.'+ range).addClass('active');
                        }
                        while ( range -->= 0 );
                    }
                });
            }
        };

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.equalizer' );
        }

    };

})( jQuery );