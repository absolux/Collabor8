/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	
	var Task = Backbone.Model.extend({
		defaults: {
			done: false,
			flag: false,
			due: null,
			user_id: null,
			label_id: null,
		},
		
		toggleDone: function() {
			this.save({done: !this.get('done')});
			
			return this;
		},
	});
	
	var Tasks = Backbone.Collection.extend({
		model: Task,
		
		project: null,
		
		url: function() {
			return "projects/" + this.project.id + "/tasks";
		},
		
		initialize: function(options) {
			this.project = options.project ? options.project : null;
		},
	});
	
	exports.Model = Task;
	exports.Collection = Tasks;
});