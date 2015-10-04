/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var Backbone = require('backbone');
    
    var Project = Backbone.Model.extend({
        
    });
    
    var Projects = Backbone.Collection.extend({
        model: Project,
        
        url: 'projects',
    });
    
    // module exports
    exports.Model       = Project;
    exports.Collection  = Projects;
});