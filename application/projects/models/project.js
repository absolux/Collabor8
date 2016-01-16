/**
 * 
 */
define(['_lib/model', '_lib/collection', 'exports'],
function(Model, Collection, exports) {
    'use strict';
    
    var Project = Model.extend({
        
        defaults: {
            'name': null,
            'desc': null,
        },
        
    });
    
    var Projects = Collection.extend({
        
        url: 'projects',
        
        model: Project,
        
    });
    
    exports.Model = Project;
    exports.Collection = Projects;
    
    /**
     * current user projects collection
     */
    exports.list = new Projects();
});