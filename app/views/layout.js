/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Marionette = require('backbone.marionette');
    
    var LayoutView = Marionette.LayoutView.extend({
        el: 'body',
        
        template: require('template!tpl/layout'),
        
        regions: {
            header: 'header',
            sidebar: 'aside',
            content: 'main'
        }
    });
    
    module.exports = LayoutView;
});