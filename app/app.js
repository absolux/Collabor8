/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    // dependencies
    var Backbone = require('backbone');
    var Marionette = require('backbone.marionette');
    
    // Application class
    var Application = Marionette.Application.extend({
        initialize: function() {
            var defaultOptions = ['locale', 'root'];
            
            this.mergeOptions(module.config(), defaultOptions);
        },
        
        onStart: function(options) {
            var that = this;
            
            require(['router'], function() {
                Backbone.history.start({pushState: true, root: that.root});
            });
        }
    });
    
    module.exports = new Application();
});