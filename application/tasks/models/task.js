/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    var Relations = require('lib/relations');
    var Activity = require('./activity');
    
    var _Model = Backbone.Model.extend({
        
        defaults: {
            name: null,
            done: false,
            flag: false,
            due: null,
            project_id: null,
            user_id: null,
            label_id: null,
        },
        
        activity: function() {
            return Relations.hasMany.call(this, 
                {key: 'activity', otherKey: 'resource', related: Activity.Collection});
        },
    });
    
    var _Collection = Backbone.Collection.extend({
        model: _Model,
        
        url: function() {
            return this.project.url() + '/tasks';
        },
        
        initialize: function(models, options) {
			if ( options.project ) {
				this.project = options.project;
			}
		},
    });
    
    // module exports
    exports.Model       = _Model;
    exports.Collection  = _Collection;
});