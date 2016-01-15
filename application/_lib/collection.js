/**
 * 
 */
define(['backbone', './util'],
function(Backbone) {
    'use strict';
    
    return Backbone.Collection.extend({
        
        /**
         * 
         */
        dispose: __dispose,
        
        /**
         * 
         */
        cleanup: function() {
            this.stopListening();
            this.invoke('dispose');
            this.reset([], {silent: true});
        },
        
    });
});