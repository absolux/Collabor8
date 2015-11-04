/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		className: 'modal',
		
		events: {
			'submit .login-form': "onLoginFormSubmitted",
		},
		
		template: require('template!common/login'),
		
		onLoginFormSubmitted: function(e) {
			e.preventDefault();
			
			var self = this;
			var data = {
				'email': this.$('#login-email-field').val().trim(),
				'password': this.$('#login-pwd-field').val().trim(),
			};
			
			require(['jquery', 'lib/ui/notifier'], function($, notifier) {
				self.$(':submit').attr('disabled', true);
				
				$.post('authenticate', data)
				 .fail(function() { notifier.show("Invalid credentials !", "Login Failure", 'error'); })
				 .fail(function() { self.$(':submit').attr('disabled', false); })
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