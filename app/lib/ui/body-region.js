/**
 * 
 */
 
 define(function(require, exports, module) {
	 'use strict';
	 
	 var Marionette = require('backbone.marionette');
	 
	 var Region = Marionette.Region.extend({
		 el: 'body',
		 
	 });
	 
	 module.exports = new Region;
 });