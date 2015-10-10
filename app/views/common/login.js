/**
 * 
 */
 
define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	var bs = require('bootstrap');
	
	var View = Marionette.ItemView.extend({
		className: 'modal',
		
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
			
			var that = this;
			var data = {
				'email': this.ui.email.val(),
				'password': this.ui.pwd.val(),
			};
			
			require(['jquery', 'router', 'lib/ui/notifier'], function($, router, notifier) {
				$.post('authenticate', data)
				 .fail(function() { notifier.show("Invalid credentials !", "Login Failure", 'error'); })
				 .done(function() { 
					 that.$el.one('hidden.bs.modal', function() { console.log('hidden modal !') });
					 that.$el.modal('hide');
				 });
			});
		},
		
		onShow: function() {
			this.$el.modal({
				backdrop: 'static',
				keyword: false,
				show: true,
			});
		},
	});
	
	module.exports = View;
});