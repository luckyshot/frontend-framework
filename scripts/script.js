/**

*/
var APP = APP || {};

(function( d ){ 'use strict';


		APP = (function( A )
		{

			// http://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
			A.ready = function ( fn )
			{
				if ( typeof fn !== 'function' ) return;
				if ( document.readyState === 'complete'  ) {
					return fn();
				}
				document.addEventListener( 'interactive', fn, false );
			};



			A.init = function()
			{
				// start here...
			};





			return A;

		})( APP || {} );

}( document ));



APP.ready(function() {
	APP.init();
});