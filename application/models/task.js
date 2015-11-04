/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var _Model = Backbone.Model.extend({
        
    });
    
    var _Collection = Backbone.Collection.extend({
        model: _Model,
        
        url: 'tasks',
    });
    
    // module exports
    exports.Model       = _Model;
    exports.Collection  = _Collection;
});