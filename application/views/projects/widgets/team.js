/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		el: false,
		
		template: require('template!projects/widgets/team'),
		
		events: {
			"submit .form-inline": "onFormSubmitted",
			"click .revoke-btn": "onRevokeClicked",
		},
		
		initialize: function(options) {
			this.users = options.users;
			
			this.listenTo(this.collection, 'update', this.render);
		},
		
		serialize: function() {
			var self = this;
			
			return {
				team: this.collection.toJSON(),
				users: this.users.reject(function(model) {
					return !!self.collection.get(model.id);
				}),
			};
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			
			var email = this.$('select').val();
			
			if ( email ) {
				this.collection.attach(email, {wait: true});
			}
		},
		
		onRevokeClicked: function(e) {
			var id = this.$(e.currentTarget).data('model');
			
			if ( confirm("Do you confirm ?") ) {
				this.collection.detach(id, {wait: true});
			}
		},
	});
});