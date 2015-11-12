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
		
		url: function() {
			return this.project.url() + '/labels';
		},
		
		initialize: function(models, options) {
			if ( options.project ) {
				this.project = options.project;
			}
		},
		
		destroy: function(id, options) {
			return this.get(id).destroy(options);
		},
	});
	
	exports.Model = _Model;
	exports.Collection = _Collection;
});