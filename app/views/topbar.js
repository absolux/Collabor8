/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone.marionette');
    
    module.exports = Backbone.View.extend({
        template: require('template!topbar')
    });
});