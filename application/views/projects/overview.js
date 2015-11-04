/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Layout = require('./layout');
	
	module.exports = Layout.extend({
		subtitle: 'Overview',
		
		initialize: function() {
			this.listenTo(this.model, 'sync', this.render);
		},
		
		_renderSubviews: function() {
			var self = this;
			
			require([
				'./widgets/activity',
				'./widgets/labels',
			], function(View1, View2) {
				self.insertView('.row', new View1({model: self.model})).render();
				self.insertView('.row', new View2({model: self.model})).render();
			});
		},
	});
});