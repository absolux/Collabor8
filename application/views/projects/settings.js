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
			], function(InfoView, TeamView) {
				self.insertView('.row', new InfoView({model: self.model})).render();
				self.insertView('.row', new TeamView({model: self.model})).render();
			});
		},
		
		onNameChanged: function(model, newValue) {
			this.$('h1 span').text(newValue); // update view title
		},
	});
});