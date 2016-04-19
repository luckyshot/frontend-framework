/**

*/
var APP = APP || {};

(function( d ){ 'use strict';


		APP = (function( A )
		{


			/**
			 * Element selectors and CSS classes
			 *
			 */
			d.id = function( id )
			{
				return d.getElementById( id );
			};
			d.qS = function( selector )
			{
				return d.querySelector( selector );
			};
			d.qSA = function( selector )
			{
				return d.querySelectorAll( selector );
			};

			Element.prototype.hasClassName = function( name )
			{
				return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
			};

			Element.prototype.addClassName = function( name )
			{
				if ( !this.hasClassName( name ) ) {
					this.className = this.className ? [this.className, name].join(' ') : name;
				}
				return this;
			};

			Element.prototype.removeClassName = function( name )
			{
				if ( this.hasClassName( name ) ) {
					var c = this.className;
					this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "").trim();
				}
				return this;
			};


			/**
			 * CRUD cookies
			 * expires is in Days or Date object
			 */
			var _cookieSet = function( name, value, expires, path, domain, secure )
			{
				var today = new Date(),
					expires_date;

				today.setTime( today.getTime() );

				if ( typeof expires === "number" )
				{
					expires = expires * 1000 * 60 * 60 * 24;
					expires_date = new Date( today.getTime() + ( expires ) );
				}
				else if ( typeof expires === "object" )
				{
					expires_date = expires;
				}
				else
				{
					return false;
				}

				document.cookie = APP_PREFIX + name + '=' + escape( value ) +
					( ( expires ) ? ';expires=' + expires_date.toGMTString() : '' ) + //expires.toGMTString()
					( ( path ) ? ';path=' + path : '' ) +
					( ( domain ) ? ';domain=' + domain : '' ) +
					( ( secure ) ? ';secure' : '' );
			};

			var _cookieGet = function( name )
			{
				var ca = document.cookie.split(';'),
					nameEQ = APP_PREFIX + name + "=",
					i = 0,
					c;
				for ( ; i < ca.length; i++ )
				{
					c = ca[i];
					while ( c.charAt(0) === ' ' )
					{
						c = c.substring( 1, c.length );
					} // delete spaces
					if ( c.indexOf( nameEQ ) === 0 )
					{
						return decodeURIComponent( c.substring( nameEQ.length, c.length ) );
					}
				}
				return null;
			};


			/**
			 * localStorage
			 *
			 */
			var _storageGet = function( param )
			{
				if ( !_lSEnabled() ) return {};
				return localStorage.getItem( param );
			};
			var _storageSet = function( param, value )
			{
				if ( !_lSEnabled() ) return false;
				if ( typeof value === 'undefined' )
				{
					return localStorage.removeItem( param );
				}
				return localStorage.setItem( param, value );
			};

			var _lSEnabled = function()
			{
				var testKey = 'a',
					storage = window.sessionStorage;
				try {
					storage.setItem( testKey, '1' );
					storage.removeItem( testKey );
					return true;
				} catch (error) {
					return false;
				}
			};




			// http://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
			// FIXME: not working in Chrome
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
