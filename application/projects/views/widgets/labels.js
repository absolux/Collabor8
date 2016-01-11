/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	var Label = require('models/label');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		el: false,
		
		events: {
			"submit .create-label-form": "onFormSubmitted",
			"click .label-delete-btn": "onDeleteClicked",
		},
		
		template: require('template!projects/widgets/labels'),
		
		initialize: function(options) {
			var labels = this.model.get('labels');
			
			this.collection = new Label.Collection(labels, {project: this.model});
			this.listenTo(this.collection, 'update', this.render);
		},
		
		serialize: function() {
			return {
				labels: this.collection.toJSON(),
			};
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			
			var tag = this.$('input').val().trim();
			
			if ( tag ) {
				this.collection.create({'name': tag}, {wait: true});
			}
		},
		
		onDeleteClicked: function(e) {
			var id = this.$(e.currentTarget).data('model');
			
			if ( confirm("Do you confirm ?") ) {
				this.collection.destroy(id, {wait: true});
			}
		},
	});
});