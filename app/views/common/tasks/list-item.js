/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	
	var View = Marionette.ItemView.extend({
		tagName: 'tr',
		
		template: require('template!common/tasks/list-item'),
		
		events: {
			'change .task-done-field': 'onDoneChanged',
			'click td': 'onTaskClicked',
		},
		
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.render);
		},
		
		onDoneChanged: function() {
			this.model.toggleDone();
		},
		
		onTaskClicked: function(e) {
			var className = 'info';
			
			if ( this.$el.hasClass(className) ) {
				return;
			}
			
			this.$el.siblings().removeClass(className);
			this.$el.addClass(className);
			this.model.collection.trigger('select:task', this.model);
		},
	});
	
	module.exports = View;
});