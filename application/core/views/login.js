/**
 * 
 */
define(['require', '_lib/view'],
function(require, View) {
    'use strict';
	
	return View.extend({
		
        className: 'modal',
		
		events: {
			'submit .login-form': "onSubmit",
		},
		
		template: require('text!../templates/login'),
		
		onSubmit: function(e) {
			var self = this;
			var data = {
				'email': this.$('#login-email-field').val().trim(),
				'password': this.$('#login-pwd-field').val().trim(),
			};
			
			require(['jquery', '_lib/ui/notifier'], function($, notifier) {
				self.$(':submit').attr('disabled', true);
				
				$.post('authenticate', data)
				 .fail(function() { notifier.show("Invalid credentials !", "Login Failure", 'error'); })
				 .fail(function() { self.$(':submit').attr('disabled', false); })
				 .done(function() { location.reload(); });
			});
            
            return false;
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