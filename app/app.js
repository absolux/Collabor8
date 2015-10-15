/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    // dependencies
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    _.defaults(exports, module.config());
    
    exports.start = function() {
        if (! Backbone.history.started ) {
            Backbone.history.start({pushState: false, root: this.root});
        }
    };
});