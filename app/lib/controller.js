/**
 * 
 */
define(['underscore', 'backbone'], function(_, Backbone) {
  'use strict';
  
  var Controller = function Controller(router, routes) {
    if ( router ) {
      if ( routes ) this.routes = routes;
      
      this.router = router;
      this._bindRoutes();
    }
    
    this.initialize.apply(this, arguments);
  }
  
  Controller.extend = Backbone.Router.extend;
  
  _.extend(Controller.prototype, Backbone.Events, {
    
    routes: {},
    
    /**
     * 
     */
    initialize: _.noop,
    
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
    _bindRoutes: function _bindRoutes() {
      var route, routes = _.keys(_.result(this, 'routes'));
            
      while ( (route = routes.pop()) != null ) {
        var name =  this.routes[route];
        
        this.router.route(route, name, _.bind(this._onRoute, this, name));
      }
    },
    
    /**
     * 
     */
    _onRoute: function _onRoute(method) {
      var args = _.rest(arguments);
      
      if (! _.isFunction(this[method]) ) return;
      
      // If the before callback fails by returning `false`,
      // then do not proceed
      if ( this.before.apply(this, args) === false ) return;
      
      this.trigger.apply(this, ['before:' + method].concat(args));
      
      this[method].apply(this, args);
      
      this.trigger.apply(this, ['after:' + method].concat(args));
      
      this.after.apply(this, args);
    }
    
    
  })
  
  return Controller;
  
});