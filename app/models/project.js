/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
    
    var __current;
	
	var Backbone = require('backbone');
    
    var Project = Backbone.Model.extend({
        urlRoot: 'projects',
    });
    
    var Projects = Backbone.Collection.extend({
        model: Project,
        
        url: 'projects',
    });
    
    // module exports
    exports.Model       = Project;
    exports.Collection  = Projects;
    
    /**
     * set the current project
     */
    exports.current = function(object) {
        if ( typeof object !== 'object' ) {
            object = new Project({id: object});
        }
        
        if ( typeof object === 'object' ) {
            __current = object;
        }
        
        return __current;
    };
});