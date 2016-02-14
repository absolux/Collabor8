/**
 * 
 */
define(['backbone', 'lib/session', 'layout'], function(Backbone, session, layout) {
  'use strict';
  
  var AppRouter = Backbone.Router.extend({
    
    /**
     * 
     */
    before: function before() {
      // check for active user session
      if (! session.has('jwt-token') ) {
        layout.showLogin();
        return false;
      }
    },
    
    /**
     * 
     */
    after: function after() {},
    
    /**
     * Execute a route callback
     */
    execute: function execute(callback, args, name) {
      // If the before callback fails by returning `false`,
      // then do not proceed the callback.
      if ( this.before.apply(this, [name].concat(args)) === false ) {
        return false;
      }

      if (callback) callback.apply(this, args);

      this.after.apply(this, [name].concat(args));
    },
    
    /**
     * Start routing
     */
    start: function start() {
      if ( Backbone.History.started ) return;
      
      Backbone.history.start({pushState: false});
    }
    
  });
  
  return new AppRouter();
  
});