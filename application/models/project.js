/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    var Relations = require('lib/relations');
    var Label = require('./label');
    var Team = require('./team');
    var Activity = require('./activity');
    var Task = require('./task');
    
    var _baseUrl = 'projects';
    var _current = null;
    
    var _Model = Backbone.Model.extend({
        urlRoot: _baseUrl,
        
        labels: function() {
            return Relations.hasMany.call(this, 
                {key: 'labels', otherKey: 'project', related: Label.Collection});
        },
        
        team: function() {
            return Relations.hasMany.call(this, 
                {key: 'team', otherKey: 'project', related: Team.Collection});
        },
        
        activity: function() {
            return Relations.hasMany.call(this, 
                {key: 'activity', otherKey: 'resource', related: Activity.Collection});
        },
        
        tasks: function() {
            return Relations.hasMany.call(this, 
                {key: 'tasks', otherKey: 'project', related: Task.Collection});
        },
    });
    
    var _Collection = Backbone.Collection.extend({
        model: _Model,
        
        url: _baseUrl,
    });
    
    // module exports
    exports.Model       = _Model;
    exports.Collection  = _Collection;
    
    /**
     * setter/getter of the current project
     */
    exports.current = function(id) {
        if ( id ) {
            _current = new _Model({});
        }
        
        return _current;
    };
});