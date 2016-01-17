/**
 * 
 */
define(['_lib/model', '_lib/collection', 'exports'], 
function(Model, Collection, exports) {
    'use strict';
    
    var Person = Model.extend({
        
        defaults: {
            name: null,
            email: null,
        },
        
    });
    
    var People = Collection.extend({
        
        model: Person,
        
        url: 'users',
        
    });
    
    // module exports
    exports.Model       = Person;
    exports.Collection  = People;
    
    exports.current = new Person;
    exports.list = new People();
});