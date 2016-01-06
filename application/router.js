/**
 * Router class
 */
define(['backbone', 'underscore', '_lib/util'], 
function(Backbone, _) {
    'use strict';
    
    var Router = Backbone.Router.extend({
        
        /**
         * 
         */
        execute: function(callback, args, name) {
            // If the before callback fails by returning `false`,
            // then do not proceed the callback.
            if ( this.before.apply(this, [name].concat(args)) === false ) {
                return false;
            }
            
            if (callback) callback.apply(this, args);
            
            this.after.apply(this, [name].concat(args));
        },
        
        /**
         * 
         */
        before: _.noop,
        
        /**
         * 
         */
        after: _.noop,
        
        /**
         * 
         */
        dispose: __dispose,
        
        /**
         * 
         */
        cleanup: function() {
            this.stopListening();
        },
        
    });
    
    return new Router;
});