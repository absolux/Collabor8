/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	var bs = require('bootstrap'); 
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		className: 'modal',
		
		events: {
			'submit .login-form': "onLoginFormSubmitted",
		},
		
		template: require('template!login'),
		
		onLoginFormSubmitted: function(e) {
			e.preventDefault();
			
			var data = {
				'email': this.$('#login-email-field').val().trim(),
				'password': this.$('#login-pwd-field').val().trim(),
			};
			
			require(['jquery', 'lib/ui/notifier'], function($, notifier) {
				$.post('authenticate', data)
				 .fail(function() { notifier.show("Invalid credentials !", "Login Failure", 'error'); })
				 .done(function() { location.reload(); });
			});
		},
		
		afterRender: function() {
			this.$el.modal({
				backdrop: 'static',
				keyword: false,
				show: true,
			});
		},
	});
});