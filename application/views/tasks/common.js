/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Helpers = require('lib/ui/helpers');
	
	/**
	 * Task ItemView
	 */
	exports.ItemView = Backbone.View.extend({
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
		
		serialize: function() {
			return _.extend(this.model.toJSON(), Helpers);
		},
		
		selectTask: function() {
			var className = 'select';
			
			if ( this.$el.hasClass(className) ) {
				this.model.collection.trigger('select:task', null);
				return;
			}
			
			this.model.collection.trigger('select:task', this.model);
			this.$el.addClass(className);
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
	 * Task DetailView
	 */
	exports.DetailView = Backbone.View.extend({
		manage: true,
		
		el: false,
		
		template: require('template!tasks/detail'),
		
		events: {
			'submit form.comment': "createComment",
		},
		
		initialize: function(options) {
			this.listenTo(this.model, 'sync', this.render);
			this.listenTo(this.model.activity(), 'reset', this.showActivity);
			this.listenTo(this.model.activity(), 'add', this.addActivity);
		},
		
		beforeRender: function() {
			this.model.activity().fetch({reset: true});
		},
		
		afterRender: function() {
			var self = this;
			var project = this.model.collection.project;
			
			this.$('form.comment textarea').on('focus', function() {
				this.rows = 4;
            });
			
			// setup editable fields
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
		
		serialize: function() {
			return _.extend(this.model.toJSON(), Helpers);
		},
		
		showActivity: function(collection) {
			var self = this;
			
			collection.each(function(item) {
				self.addActivity(item);
			});
		},
		
		addActivity: function(item) {
			var view = new ActivityView({model: item});
				
			this.insertView('.activity-stream .list', view).render();
		},
        
        createComment: function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var $textarea = this.$('form.comment textarea');
			var comment = $textarea.val().trim();
			
			if ( comment ) {
				this.model.activity().create({'note': comment}, {wait: true});
				$textarea.val('');
			}
		},
	});
	
	/**
	 * Task ActivityView
	 */
	var ActivityView = Backbone.View.extend({
		manage: true,
		
		className: 'media',
		
		template: require('template!tasks/activity-item'),
		
		serialize: function() {
			return _.extend(this.model.toJSON(), Helpers);
		},
	});
	
	exports.ActivityView = ActivityView;
});