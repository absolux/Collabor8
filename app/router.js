/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var _ = require('underscore');
    var Marionette = require('backbone.marionette');
    
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            
        },
        
        /**
         * alias of navigate navigate, with trigger option set to true
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