/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	var Layout = require('views/projects/layout');
	var Common = require('./common');
	
	var ListView = Backbone.View.extend({
		manage: true,
		
		className: 'col-md-12',
		
		template: require('template!tasks/list'),
		
		events: {
			"submit .create-form": "onFormSubmitted",
		},
		
		initialize: function(options) {
			this.listenTo(this.collection, 'add', this.addNewTask);
			this.listenTo(this.collection, 'select:task', this.showDetail);
		},
		
		afterRender: function() {
			this.collection.fetch();
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var task = this.$('.input-sm').val().trim();
			
			if ( task ) {
				this.collection.create({'name': task});
				this.$('.create-form').trigger('reset');
			}
		},
		
		addNewTask: function(task) {
			this.insertView('tbody', new Common.ItemView({model: task})).render();
		},
		
		showDetail: function(task) {
			if ( this.detail ) {
				this.detail.remove();
			}
			
			if ( task ) {
				var view = this.detail = new Common.DetailView({model: task});
				
				this.insertView(view).render();
			}
		},
	});
	
	module.exports = Layout.extend({
		subtitle: 'Tasks',
		
		initialize: function() {
			this.listenTo(this.model, 'sync', this.render);
		},
		
		_renderSubviews: function() {
			var self = this;
			
			require(['views/tasks/list'], function(View) {
				var view = new ListView({collection: self.model.tasks()});
				
				self.setView('.row', view).render();
			});
		},
	});
});