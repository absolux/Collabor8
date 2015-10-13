/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    // dependencies
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var app = _.extend(module.config(), {
        
        start: function() {
            if (! Backbone.history.started ) {
                Backbone.history.start({pushState: false, root: this.root});
            }
        },
    });
    
    module.exports = app;
});