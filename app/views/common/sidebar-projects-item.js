/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		tagName: 'li',
		
		className: 'dropdown',
		
		template: require('template!common/sidebar-projects-item'),
	});
});