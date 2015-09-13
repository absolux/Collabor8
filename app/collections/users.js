/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var App = require('app');
    var Backbone = require('backbone');
    
    var Collection = Backbone.Collection.extend({
        model: require('../models/user'),
        
        url: function() {
            return App.api + 'users';
        }
    });
    
    module.exports = Collection;
});