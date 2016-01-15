/**
 * 
 */
define(['backbone', './util'],
function(Backbone) {
    'use strict';
    
    return Backbone.Model.extend({
	
        /**
         * 
         */
        dispose: __dispose,
        
        /**
         * 
         */
        cleanup: function() {
            this.stopListening();
            this.clear({silent: true});
            
            if ( this.collection ) this.collection.remove(this);
        },
	   
    });
});