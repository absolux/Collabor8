/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    require('bootstrap');
    
    var Backbone = require('backbone');
    
    var Layout = Backbone.View.extend({
        el: 'body',
        
        template: require('template!layout'),
        
        
    });
    
    module.exports = new Layout();
});