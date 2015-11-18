/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var _ = require('underscore');
	var Common = require('./common');
	var Layout = require('backbone.layout');
	
	/**
	 * ListView
	 */
	var ListView = Layout.extend({
		el: false,
		
		template: require('template!tasks/project-list'),
		
		events: {
			"submit .create-form": "onFormSubmitted",
		},
		
		initialize: function(options) {
			this.listenTo(this.collection, 'add', this.addNewTask);
		},
		
		serialize: function() {
			return this.collection.project.toJSON();
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var taskName = this.$('.create-form input').val().trim();
			
			if ( taskName ) {
				this.collection.create({'name': taskName});
				this.$('.create-form').trigger('reset');
			}
		},
		
		addNewTask: function(task) {
			this.insertView('tbody', new Common.ItemView({model: task})).render();
		},
	});
	
	/**
	 * Main view
	 */
	module.exports = Layout.extend({
		className: 'container-fluid',
		
		template: require('template!tasks/my-tasks'),
		
		initialize: function(options) {
			this.listenTo(options.tasks, 'reset', this.showTaskList);
		},
		
		showTaskList: function(all) {
			var $this = this;
			var grouped = _.groupBy(all.toJSON(), 'project_id');
			
			this.collection.each(function(project) {
				var tasks = project.tasks();
				var view = new ListView({collection: tasks});
				
				$this.listenTo(tasks, 'select:task', $this.showDetail);
				$this.insertView('.list', view).render();
				tasks.set(grouped[project.id] || []);
			});
		},
		
		showDetail: function(task) {
			if ( this.detail ) {
				this.detail.remove();
			}
			
			if ( task ) {
				var view = this.detail = new Common.DetailView({model: task});
				
				this.insertView('.wrapper', view).render();
			}
		},
	});
});