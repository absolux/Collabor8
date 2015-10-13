/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    require('bootstrap');
    
    var Backbone = require('backbone');
    
    module.exports = Backbone.View.extend({
        el: 'body',
        
        template: require('template!layout'),
        
        
    });
});