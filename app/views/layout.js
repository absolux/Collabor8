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
                /*require(['views/common/siddebar'], function(Sidebar) {
                    that.getRegion('sidebar').show(new Sidebar());
                });*/
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