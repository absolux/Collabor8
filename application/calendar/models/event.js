/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var _Model = Backbone.Model.extend({
        
		defaults: {
			'title': null,
            'start': null,
            'end': null,
            'shared': false,
            
		},
    });
    
    var _Collection = Backbone.Collection.extend({
        model: _Model,
        
        url: 'events',
    });
    
    // module exports
    exports.Model       = _Model;
    exports.Collection  = _Collection;
});