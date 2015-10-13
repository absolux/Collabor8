/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	
	var View = Marionette.CompositeView.extend({
		tagName: 'table',
		
		className: 'task-list table table-hover',
		
		template: require('template!common/tasks/list'),
		
		childViewContainer: 'tbody',
		
		childView: require('./list-item'),
		
		ui: {
			nameField: '.new-task-field'
		},
		
		events: {
			'submit .new-task-form': 'onNewTaskSubmitted',
		},
		
		onNewTaskSubmitted: function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var task = this.ui.nameField.val().trim();
			
			if ( task ) {
				this.collection.create({name: task}, {wait: true});
				this.ui.nameField.val('');
			}
		},
	});
	
	module.exports = View;
});