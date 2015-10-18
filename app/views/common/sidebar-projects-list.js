/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		className: 'subnav',
		
		ui: {},
		
		events: {
			'submit .create-form': 'onFormSubmitted',
			'hidden.bs.modal #add-project-dialog': 'onModalHidden',
		},
		
		template: require('template!common/sidebar-projects-list'),
		
		initialize: function(options) {
			this.listenTo(this.collection, 'reset add', this.render);
		},
		
		afterRender: function() {
			var self = this;
			
			// create UI elements
			this.ui.nameField = this.$('#project-name-field');
			this.ui.descField = this.$('#project-desc-field');
			this.ui.dialog = this.$('#add-project-dialog');
			
			// attach sub view
			require(['./sidebar-projects-item'], function(ItemView) {
				self.collection.each(function(project) {
					var view = new ItemView({model: project});
					
					self.insertView('ul.subnav-menu', view).render();	
				});
			});
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			
			var self = this;
			var data = {
				'name': this.ui.nameField.val().trim(),
				'desc': this.ui.descField.val().trim(),
			};
			
			this.collection.create(data, {
				wait: true,
				success: function() { self.ui.dialog.modal('hide'); },
				error: function() {
					require('lib/ui/notifier').show("Please, try again", "Error occured", 'error');
				},
			});
		},
		
		onModalHidden: function() {
			this.ui.nameField.val("");
			this.ui.descField.val("");
		},
	});
});