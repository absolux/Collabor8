/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	
	var _Model = Backbone.Model.extend({
		
	});
	
	var _Collection = Backbone.Collection.extend({
		
		model: _Model,
		
		initialize: function(models, options) {
			this.resource = options.resource ? options.resource : null;
		},
		
		url: function() {
			return this.resource.url() + '/activity';
		},
	});
	
	// exports
	exports.Model = _Model;
	exports.Collection = _Collection;
});