/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    require('bootstrap');
    
    var Layout = require('backbone.layout');
    
    var View = Layout.extend({
        el: 'body',
        
        template: require('template!layout'),
        
        /**
         * render and show the main view
         */
        show: function(view) {
            var self = this;
            
            require([
                './common/header', 
                './common/sidebar'
            ], function(Header, Sidebar) {
                // check if the header view is rendered
                if (! self.getView('header') ) {
                    self.setView('header', new Header()).render();
                }
                
                // check if the sidebar is rendered
                if (! self.getView('aside') ) {
                    self.setView('aside', new Sidebar()).render();
                }
                
                self.setView('main', view).render();
            });
        },
    });
    
    module.exports = new View();
});