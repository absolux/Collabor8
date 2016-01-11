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
			if ( options.project ) {
				this.project = options.project;
			}
		},
		
		url: function() {
			return this.project.url() + '/team';
		},
		
		attach: function(email, options) {
			return this.create({'email': email}, options);
		},
		
		detach: function(id, options) {
			return this.get(id).destroy(options);
		},
	});
});