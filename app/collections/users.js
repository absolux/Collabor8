/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var Collection = Backbone.Collection.extend({
        model: require('../models/user'),
        
        url: 'users'
    });
    
    module.exports = Collection;
});