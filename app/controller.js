/**
 * 
 */
 
define(function(require, exports, module) {
	'use strict';
	 
	var afterLogin = function(callback) {
		if ( typeof callback !== 'function' ) {
			return null;
		}
		
		return function() {
			require(['lib/session', 'router'], function(session, router) {
				if ( session.has('user.token') ) {
					callback();
				}
				else {
					router.redirect('#/login');
				}
			});
		};
	};
	
	exports.home = afterLogin(function() {
		require(['views/layout', 'views/content/home'], function(layout, HomeView) {
			layout.show(new HomeView());
		});
	});
	
	exports.login = function() {
		require(['views/layout', 'views/common/login'], function(layout, LoginView) {
			layout.showModal(new LoginView());
		});
	};
	 
	 
 });