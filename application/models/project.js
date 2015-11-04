/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var baseUrl = 'projects';
    
    var _Model = Backbone.Model.extend({
        urlRoot: baseUrl,
    });
    
    var _Collection = Backbone.Collection.extend({
        model: _Model,
        
        url: baseUrl,
    });
    
    // module exports
    exports.Model       = _Model;
    exports.Collection  = _Collection;
    
    var _list;
    exports.getList = function() {
        if (! _list ) {
            _list = new _Collection();
        }
        
        return _list;
    };
});