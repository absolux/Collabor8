/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Marionette = require('backbone.marionette');
    
    var LayoutView = Marionette.LayoutView.extend({
        el: false,
        
        template: require('template!layout'),
        
        regions: {
            header: 'header',
            sidebar: 'aside',
            content: 'main'
        }
    });
    
    // retrurn an instance of the layout as a singleton
    module.exports = new LayoutView();
});