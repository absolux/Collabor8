/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	
	var View = Marionette.ItemView.extend({
		className: 'container-fluid',
		
		template: require('template!content/home'),
	});
	
	module.exports = View;
});