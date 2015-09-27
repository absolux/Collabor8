/**
 * 
 */
 
define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	
	var View = Marionette.ItemView.extend({
		className: 'login',
		
		ui: {
			email: '#login-email-field',
			pwd: '#login-password-field',
		},
		
		events: {
			'submit .login-form': "onLoginFormSubmitted",
		},
		
		template: require('template!common/login'),
		
		onLoginFormSubmitted: function(e) {
			e.preventDefault();
			
			var data = {
				'email': this.ui.email.val(),
				'password': this.ui.pwd.val(),
			};
			
			require(['jquery', 'router', 'lib/ui/notifier'], function($, router, notifier) {
				$.post('authenticate', data)
				 .done(function() { router.redirect('#/'); })
				 .fail(function() { notifier.show("Invalid credentials !", "Login Failure", 'error'); });
			});
		},
	});
	
	module.exports = View;
});