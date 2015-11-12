/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Layout = require('backbone.layout');
	
	/**
	 * List view
	 */
	var View = Layout.extend({
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
			this.insertView('tbody', new ItemView({model: task})).render();
		},
		
		showDetail: function(task) {
			if ( this.detail ) {
				this.detail.remove();
			}
			
			if ( task ) {
				var view = this.detail = new DetailView({model: task});
				
				this.insertView(view).render();
			}
		},
	});
	
	/**
	 * Item view
	 */
	var ItemView = Backbone.View.extend({
		manage: true,
		
		tagName: 'tr',
		
		template: require('template!tasks/list-item'),
		
		events: {
			"click td:not(.table-icon)": "selectTask",
			"change .selectable": "onStatusChanged",
			"click .sel-star": "onStarClicked",
		},
		
		initialize: function() {
			this.listenTo(this.model, 'sync', this.render);
		},
		
		beforeRender: function() {
			if ( this.model.isNew() ) {
				this.$el.addClass('wait');
			}
			else {
				this.$el.removeClass('wait');
			}
		},
		
		afterRender: function() {
			this.$('[rel=tooltip]').tooltip({
				container: 'body',
			});
		},
		
		selectTask: function() {
			var className = 'select';
			
			if ( this.$el.hasClass(className) ) {
				this.$el.removeClass(className);
				this.model.collection.trigger('select:task');
				return;
			}
			
			this.$el.siblings().removeClass(className);
			this.$el.addClass(className);
			this.model.collection.trigger('select:task', this.model);
		},
		
		onStatusChanged: function(e) {
			this.$el.addClass('wait');
			this.model.save('done', e.currentTarget.checked);
		},
		
		onStarClicked: function(e) {
			this.$el.addClass('wait');
			this.model.save('flag', !this.model.get('flag'));
		},
	});
	
	/**
	 * Detail view
	 */
	var DetailView = Backbone.View.extend({
		manage: true,
		
		el: false,
		
		template: require('template!tasks/detail'),
		
		initialize: function(options) {
			var activity = this.model.activity();
			
			this.listenTo(this.model, 'sync', this.render);
			this.listenTo(activity, 'update', this.showActivity);
			//activity.fetch();
		},
		
		afterRender: function() {
			var self = this;
			var project = this.model.collection.project;
			
			// apply 
			require(['jquery', 'xeditable'], function($) {
				self.$('.editable').each(function(i, el) {
					var $el = $(el);
					var name = $el.data('name');
					var xconfig = {
						'mode': 'inline',
						'send': 'never',
						'unsavedclass': null,
						'showbuttons': false,
						'disabled': self.model.get('done'),
						'success': function(response, newValue) {
							self.model.save(name, _.isEmpty(newValue) ? null : newValue);
						},
					};
					
					if ( _.contains(['user_id', 'label_id'], name) ) {
						var attr = (name === 'user_id') ? 'team' : 'labels';
						
						_.extend(xconfig, {
							source: _.map(project.get(attr), function(obj) {
								return {'text': obj.name, 'value': obj.id};
							}),
						});
					}
					
					$el.editable(xconfig);
				});
			});
		},
		
		showActivity: function() {
			
		},
	});
	
	var ActivityView = Backbone.View.extend({
		manage: true,
		
		
	});
	
	module.exports = View;
});