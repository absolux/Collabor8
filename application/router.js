/**
 * Router class
 */
define(['backbone', 'underscore', '_lib/session', '_lib/util'], 
function(Backbone, _, session) {
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
         * before any valid route, check user session
         */
        before: function() {
            if (! session.active ) {
                require(['core/layout'], function(layout) {
                    layout.showLoginForm();
                });
                
                return false;
            }
        },
        
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