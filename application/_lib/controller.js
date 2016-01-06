/**
 * 
 */
define(['backbone', 'underscore', './util'],
function(Backbone, _) {
    'use strict';
    
    /**
     * Controller constructor
     */
    var Controller = function(router, routes) {
        if ( router ) {
            this.router = router
            
			if ( routes ) this.routes = routes;
            
			this._bindRoutes();
		}
        
        this.initialize.apply(this, arguments);
    };
    
    Controller.extend = Backbone.Router.extend;
    
    _.extend(Controller.prototype, Backbone.Events, {
        
        /**
         * 
         */
        routes: {},
        
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
        initialize: _.noop,
        
        /**
         * 
         */
        dispose: __dispose,
        
        /**
         * 
         */
        cleanup: _.noop,
        
        /**
         * Binds all defined routes to `Backbone.history`.
         */
        _bindRoutes: function() {
            var route, routes = _.keys(_.result(this, 'routes'));
            
            while ( (route = routes.pop()) != null ) {
                var name =  this.routes[route];
                
                this.router.route(route, name, _.bind(this._onRoute, this, name));
            }
        },
        
        /**
         * 
         */
        _onRoute: function(method) {
			var args = _.rest(arguments);
            
			if (! _.isFunction(this[method]) ) return;
            
			// If the before callback fails by returning `false`,
			// then do not proceed.
			if ( this.before.apply(this, args) === false ) {
				return;
			}
            
			this.trigger.apply(this, ['before:' + method].concat(args));
            
			// call route callback
			this[method].apply(this, args);
            
			this.trigger.apply(this, ['after:' + method].concat(args));
            
			this.after.apply(this, args);
		},
        
    });
    
    return Controller;
});