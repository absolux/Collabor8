/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Layout = require('./layout');
	
	module.exports = Layout.extend({
		subtitle: 'Settings',
		
		initialize: function() {
			this.listenTo(this.model, 'change:name', this.onNameChanged);
		},
		
		_renderSubviews: function() {
			var self = this;
			
			require([
				'./widgets/info',
				'./widgets/team',
				'models/user',
				'models/team',
			], function(InfoView, TeamView, User, Team) {
				var users = new User.Collection();
				var team = new Team.Collection(self.model.get('team'), {project: self.model});
				var view1 = new InfoView({model: self.model});
				var view2 = new TeamView({model: self.model, collection: team, users: users});
				
				self.insertView('.row', view1).render();
				
				users.fetch().done(function() {
					self.insertView('.row', view2).render();
				});
			});
		},
		
		onNameChanged: function(model, newValue) {
			this.$('h1 span').text(newValue); // update view title
		},
	});
});