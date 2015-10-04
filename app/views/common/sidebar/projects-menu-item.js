/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Marionette = require('backbone.marionette');
    var Project = require('models/project');
	
	var View = Marionette.ItemView.extend({
        tagName: 'li',
        
        className: 'dropdown',
        
        template: require('template!common/sidebar/projects-menu-item'),
        
        model: Project.Model,
    });
    
    module.exports = View;
});