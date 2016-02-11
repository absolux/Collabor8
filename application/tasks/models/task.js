/**
 * 
 */
define(['_lib/model', '_lib/collection', 'exports'],
function(Model, Collection, exports) {
    'use strict';
    
    var Task = Model.extend({
        
        defaults: {
            'name': null,
            'project_id': null, // project
            'user_id': null, // author
        },
        
    });
    
    var List = Collection.extend({
        
        model: Task,
        
        url: 'tasks',
        
    });
    
    // module exports
    exports.Model = Task;
    exports.Collection = List;
});