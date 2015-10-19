 /**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var _ = require('underscore');
	var Layout = require('backbone.layout');
	
	module.exports = Layout.extend({
		className: 'container-fluid',
		
		template: require('template!projects/layout'),
		
		serialize: function() {
			return {
				model: _.clone(this.model.attributes),
				subtitle: this.subtitle,
			};
		},
		
		afterRender: function() {
			this._renderSubviews();
		},
		
		/**
		 * to override
		 */
		_renderSubviews: function() {},
	});
});