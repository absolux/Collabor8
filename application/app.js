/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Layout = require('backbone.layout');
    
    var Application = Layout.extend({
        
        el: 'body',
        
        template: require('template!common/layout'),
        
        config: module.config(),
        
        /**
         * render and show the main view
         */
        show: function(view, options) {
            var self = this;
            
            options = _.extend({render: true}, options);
            
            require([
                'views/common/header', 
                'views/common/sidebar',
            ], function(Header, Sidebar) {
                // check if the header view is rendered
                if (! self.getView('header') ) {
                    self.setView('header', new Header()).render();
                }
                
                // check if the sidebar is rendered
                if (! self.getView('aside') ) {
                    self.setView('aside', new Sidebar()).render();
                }
                
                self.setView('main', view);
                
                if ( options.render === true ) {
                    view.render();
                }
            });
        },
        
        start: function() {
            this.render();
            
            if (! Backbone.history.started ) {
                Backbone.history.start({pushState: false, root: this.config.root});
            }
        },
    });
    
    module.exports = new Application();
});