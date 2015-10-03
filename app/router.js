/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var _ = require('underscore');
    var Marionette = require('backbone.marionette');
    
    var Router = Marionette.AppRouter.extend({
        controller: require('./controller'),
        
        appRoutes: {
            '':         "home",
            'login':    "login",
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
        
    });
    
    module.exports = new Router;
});