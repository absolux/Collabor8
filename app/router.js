/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var _ = require('underscore');
    var Marionette = require('backbone.marionette');
    
    var Controller = Marionette.Controller.extend({
        login: function() {
            require(['views/common/login', 'lib/ui/body-region'], function(LoginView, region) {
                region.show(new LoginView());
            });
        },
        
        home: function() {
            require(['lib/ui/body-region', 'views/layout'], function(region, layout) {
                region.show(layout);
            });
        },
    });
    
    var Router = Marionette.AppRouter.extend({
        controller: new Controller(),
        
        appRoutes: {
            '': 'home',
            'login': "login"
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