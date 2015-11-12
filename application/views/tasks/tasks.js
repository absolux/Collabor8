/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Layout = require('views/projects/layout');
	
	module.exports = Layout.extend({
		subtitle: 'Tasks',
		
		initialize: function() {
			this.listenTo(this.model, 'sync', this.render);
		},
		
		_renderSubviews: function() {
			var self = this;
			
			require(['views/tasks/list'], function(View) {
				var view = new View({collection: self.model.tasks()});
				
				self.setView('.row', view).render();
			});
		},
	});
});