/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Marionette = require('backbone.marionette');
    
    var LayoutView = Marionette.LayoutView.extend({
        el: 'body',
        
        template: require('template!layout'),
        
        regions: {
            header: 'header',
            sidebar: 'aside',
            content: 'main',
            footer: 'footer',
        },
        
        /**
         * Show the content view
         * 
         * @param {object} view
         */
        show: function(view) {
            var that = this;
            
            if (! this.getRegion('header').hasView() ) {
                require(['views/common/header'], function(Header) {
                    that.getRegion('header').show(new Header());
                });
            }
            
            if (! this.getRegion('sidebar').hasView() ) {
                require(['views/common/sidebar', 'models/project'], function(Sidebar, Project) {
                    var col = new Project.Collection();
                    
                    that.getRegion('sidebar').show(new Sidebar({collection: col}));
                });
            }
            
            this.getRegion('content').show(view);
        },
        
        /**
         * Show a bootstrap modal in layout footer region
         */
        showModal: function(view) {
            this.getRegion('footer').show(view);
        },
    });
    
    // retrurn an instance of the layout as a singleton
    module.exports = (new LayoutView()).render();
});