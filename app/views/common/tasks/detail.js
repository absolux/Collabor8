/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
	
	var View = Marionette.ItemView.extend({
		tagName: 'article',
		
		template: require('template!common/tasks/detail'),
		
		ui: {
			submitBtn: '.actions :submit',
			deleteBtn: '.delete-btn',
		},
		
		events: {
			'submit form.task-detail-form': 'onFormSubmitted',
			'change .form-control': 'onAttributeChanged',
			'click @ui.deleteBtn': 'onDeleteTaskClicked',
		},
		
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		
		onShow: function() {
			this.$el.css('padding', "10px 0 0 10px");
		},
		
		onFormSubmitted: function(e) {
			e.preventDefault();
			
			this.model.save();
			this.ui.submitBtn.hide();
		},
		
		onAttributeChanged: function(e) {
			var data = {};
			var name = this.$(e.target).attr('name');
			
			data[name] = this.$(e.target).val();
			this.model.set(data, {silent: false});
			this.ui.submitBtn.show();
		},
		
		onDeleteTaskClicked: function() {
			if ( confirm("Do you confirm ?") ) {
				this.model.destroy({wait: true});
				this.destroy();
			}
		},
	});
	
	module.exports = View;
});