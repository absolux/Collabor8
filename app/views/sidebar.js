/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Marionette = require('backbone.marionette');
    
    var View = Marionette.ItemView.extend({
        template: require('template!../templates/sidebar')
    });
    
    module.exports = View;
});