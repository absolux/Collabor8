/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Layout = require('backbone.layout');
	
	module.exports = Layout.extend({
		className: 'container-fluid',
		
		template: require('template!projects/overview'),
	});
});