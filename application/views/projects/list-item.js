/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var _ = require('underscore');
	var Backbone = require('backbone');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		el: false,
		
		template: require('template!projects/list-item'),
		
		initialize: function() {
			this.listenTo(this.model, 'sync', this.render);
		},
		
		serialize: function() {
			return {
				p: _.clone(this.model.attributes),
				isNew: this.model.isNew(),
				isBookmarked: true,
			}
		},
	});
});