/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    // dependencies
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('backbone.marionette');
    var Router = require('router');
    var Layout = require('views/layout');
    
    // options names
    var defaultOptions = ['locale', 'root', 'api', 'header'];
    
    // Application class
    var Application = Marionette.Application.extend({
        initialize: function() {
            this.mergeOptions(module.config(), defaultOptions);
            
            // define app router
            this.router = new Router();
            
            // define app layout
            this.layout = new Layout();
            
            // define session app module
            this.session = require('lib/session');
        },
        
        onBeforeStart: function() {
            this.layout.render();
        },
        
        onStart: function(options) {
            if (! Backbone.history.started ) {
                Backbone.history.start({pushState: false, root: this.root});
            }
        },
        
        /**
         * alias of router navigate function, with trigger option set to true
         * 
         * @param {string} fragment
         * @param {object} options
         */
        redirect: function(fragment, options) {
            options = _.extend({trigger: true}, options);
            
            this.router.navigate(fragment, options);
        },
        
        /**
         * show a toastr notification
         * 
         * @param {string} message
         * @param {string} title
         * @param {string|object} options
         */
        notify: function(message, title, options) {
            options = options || {};
            
            if ( typeof options === 'string' ) {
                options = {'type': options};
            }
            
            _.defaults(options, {
                'type': 'info', 
                'positionClass': 'toast-bottom-right',
                'closeButton': true
            });
            
            if ( options.sticky === true ) {
                options.timeOut = 0;
                options.extendedTimeOut = 0;
            }
            
            require(['toastr'], function(toast) {
                toast[options.type](message, title, options);
            });
        },
        
    });
    
    module.exports = new Application();
});