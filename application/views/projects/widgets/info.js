/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var $ = require('jquery');
	var Backbone = require('backbone');
	var x = require('xeditable');
	
	module.exports = Backbone.View.extend({
		manage: true,
		
		el: false,
		
		template: require('template!projects/widgets/info'),
		
		afterRender: function() {
			var self = this;
			
			this.$('.form-control-static a').each(function(i, el) {
				var $el = $(el);
				var name = $el.data('name');
				
				$el.editable({
					mode: 'inline',
					send: 'never',
					unsavedclass: null,
					success: function(response, newValue) {
						self.model.save(name, newValue);
					},
				});
			});
		},
	});
});