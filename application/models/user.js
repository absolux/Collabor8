/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var User = Backbone.Model.extend({
        
    });
    
    var Users = Backbone.Collection.extend({
        model: User,
        
        url: 'users',
    });
    
    // module exports
    exports.Model       = User;
    exports.Collection  = Users;
});