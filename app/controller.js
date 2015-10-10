/**
 * 
 */
 
define(function(require, exports, module) {
	'use strict';
	
	exports.home = function() {
		require(['views/layout', 'views/content/home'], function(layout, HomeView) {
			layout.show(new HomeView());
		});
	};
	
	exports.login = function() {
		require(['views/layout', 'views/common/login'], function(layout, LoginView) {
			layout.showModal(new LoginView());
		});
	};
	
	exports.showTasks = function(id) {
		require(['views/layout', 'views/content/project-tasks'], function(layout, TasksView) {
			layout.show(new TasksView());
		});
	};
 });