/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    var session = require('lib/session');
    
    module.exports = Backbone.View.extend({
        manage: true,
        
        className: 'container-fluid',
        
        template: require('template!common/header'),
        
        events: {
			'click .btn-logout': 'onLogoutClicked',
		},
		
		html: function($el, content) {
            $el.html(content).delay(50).slideDown(100);
        },
        
        serialize: function() {
            return {
                isLoggedIn: window.isLogged,
				username: session.get('user.name'),
            };
        },
		
		onLogoutClicked: function() {
			// TODO should notify the api to invalidate the current token
			session.flush();
			require('router').goLogin();
		},
    });
});