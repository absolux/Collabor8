/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	
	var View = Marionette.LayoutView.extend({
		className: 'container-fluid',
		
		template: require('template!content/project-tasks'),
		
		regions: {
			'list': 	"section.list",
			'detail': 	"section.detail",
		},
		
		onBeforeRender: function() {
			var that = this;
			
			require(['views/common/tasks/list', 'models/task'], function(ListView, Task) {
				var col = new Task.Collection({project: that.model});
				
				that.listenTo(col, 'select:task', that.onTaskSelected);
				
				col.fetch().done(function() {
					that.getRegion('list').show(new ListView({collection: col}));
				});
			});
		},
		
		onTaskSelected: function(task) {
			var that = this;
			
			require(['views/common/tasks/detail'], function(View) {
				that.getRegion('detail').show(new View({model: task}));
				/*task.fetch().done(function() {
					
				});*/
			});
		},
	});
	
	module.exports = View;
});