/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    require('bootstrap');
    
    var Marionette = require('backbone.marionette');
    var TopbarView = require('./topbar');
    var SidebarView = require('./sidebar');
    
    var LayoutView = Marionette.LayoutView.extend({
        el: 'body',
        
        template: require('template!../templates/layout'),
        
        regions: {
            header: 'header',
            sidebar: 'aside',
            content: 'main'
        },
        
        onRender: function() {
            this.header.show(new TopbarView());
            this.sidebar.show(new SidebarView());
        }
    });
    
    module.exports = LayoutView;
});