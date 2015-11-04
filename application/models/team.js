/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	var User = require('models/user');
	
	exports.Collection = Backbone.Collection.extend({
		model: User.Model,
		
		initialize: function(models, options) {
			this.project = options.project ? options.project : null;
		},
		
		url: function() {
			return 'projects/' + this.project.id + '/team';
		},
		
		attach: function(email, options) {
			this.create({'email': email}, options);
		},
		
		detach: function(id, options) {
			var model = this.get(id);
			
			if ( model ) {
				model.urlRoot = this.url();
				model.destroy(options);
			}
		},
	});
});