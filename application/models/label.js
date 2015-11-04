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
		
		project: null,
		
		url: function() {
			return 'projects/' + this.project.id + '/labels';
		},
		
		initialize: function(models, options) {
			this.project = options.project ? options.project : null;
		},
		
		destroy: function(id, options) {
			var model = this.get(id);
			
			if ( model ) {
				model.urlRoot = this.url();
				model.destroy(options);
			}
		},
	});
	
	exports.Model = _Model;
	exports.Collection = _Collection;
});