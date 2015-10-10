/**
 *  
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	var session = require('lib/session');
	
	var View = Marionette.ItemView.extend({
		template: require('template!common/header'),
		
		events: {
			'click .btn-logout': 'onLogoutClicked',
		},
		
		serializeData: function() {
			return {
				isLoggedIn: session.has('user.token'),
				username: session.get('user.name'),
			};
		},
		
		onBeforeShow: function() {
			this.$el.attr('id', 'navigation');
		},
		
		onLogoutClicked: function() {
			// TODO should notify the api to invalidate the token
			session.flush();
			require('router').redirect('#/');
		},
	});
	
	module.exports = View;
});