/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Layout = require('backbone.layout');
	var ItemView = require('./list-item');
	
	module.exports = Layout.extend({
		className: 'container-fluid',
		
		template: require('template!projects/list'),
		
		events: {
            'hidden.bs.modal #add-project-dialog': 'onFormHidden',
            'submit .create-form': 'onFormSubmitted',
        },
		
		initialize: function() {
			this.listenTo(this.collection, 'add', this.onProjectAdded);
		},
		
        afterRender: function() {
			var self = this;
			
			this.collection.fetch({
				silent: true,
				success: function(collection) {
					collection.each(function(project) {
						self.insertView('.projects', new ItemView({model: project})).render();
					});
				},
			});
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			
			var data = {
				'name': this.$('#project-name-field').val().trim(),
				'desc': this.$('#project-desc-field').val().trim(),
			};
			
			this.collection.create(data);
			this.$('#add-project-dialog').modal('hide');
		},
		
		onFormHidden: function() {
			this.$('.create-form').trigger('reset');
		},
		
		onProjectAdded: function(project) {
			this.insertView('.projects', new ItemView({model: project})).render();
		},
	});
});