/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var _ = require('underscore');
    var Marionette = require('backbone.marionette');
    var filter = require('backbone.routefilter');
    
    var Router = Marionette.AppRouter.extend({
        controller: require('./lib/controller'),
        
        appRoutes: {
            '':         "home",
            'login':    "login",
            'p/:id/tasks':  "showTasks",
        },
        
        /**
         * alias of navigate, with trigger option set to true
         * 
         * @param {string} fragment
         * @param {object} options
         * @returns {void}
         */
        redirect: function(fragment, options) {
            options = _.extend({trigger: true}, options);
            
            this.navigate(fragment, options);
        },
        
        /**
         * 
         */
        before: function(route) {
            if ( route === 'login' ) {
                return true;
            }
            
            var authenticated = require('lib/session').has('user.token');
            
            if (! authenticated ) {
                //this.redirect('#/login');
                this.controller.login();
            }
            
            return authenticated;
        },
    });
    
    module.exports = new Router;
});