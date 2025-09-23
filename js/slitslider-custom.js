$(function() {
			
				var Page = (function() {

					var $nav = $( '#nav-dots > span' ),
						slitslider = $( '#slider' ).slitslider( {
							onBeforeChange : function( slide, pos ) {

								$nav.removeClass( 'nav-dot-current' );
								$nav.eq( pos ).addClass( 'nav-dot-current' );

							}
						} ),

						init = function() {

							initEvents();
							
						},
						initEvents = function() {

							$nav.each( function( i ) {
							
								$( this ).on( 'click', function( event ) {
									
									var $dot = $( this );
									
									if( !slitslider.isActive() ) {

										$nav.removeClass( 'nav-dot-current' );
										$dot.addClass( 'nav-dot-current' );
									
									}
									
									slitslider.jump( i + 1 );
									return false;
								
								} );
								
							} );

						};

						return { init : init };

				})();

				Page.init();

			}); 

			$(function () {
    var Page = (function () {

        var $nav = $('#nav-dots > span'),
            slitslider = $('#slider').slitslider({
                autoplay: true,
                interval: 5000
            }),

            init = function () {
                initEvents();
            },
            initEvents = function () {
                $nav.each(function (i) {
                    $(this).on('click', function (event) {
                        var $dot = $(this);

                        if (!slitslider.isActive()) {
                            $nav.removeClass('nav-dot-current');
                            $dot.addClass('nav-dot-current');
                        }

                        slitslider.jump(i + 1);
                        return false;
                    });
                });

                // 🔥 Soporte swipe en móvil
                $("#slider").swipe({
                    swipe: function (event, direction) {
                        if (direction === 'left') {
                            slitslider.next();
                        }
                        if (direction === 'right') {
                            slitslider.previous();
                        }
                    },
                    threshold: 50 // sensibilidad (px) del gesto
                });
            };

        return { init: init };

    })();

    Page.init();
});
