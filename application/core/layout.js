/**
 * 
 */
define(['require', '_lib/view', 'text!./templates/layout'], 
function(require, View, tpl) {
    'use strict';
    
    var Layout = View.extend({
        
        className: 'container-fluid',
        
        id: 'content',
        
        template: tpl,
        
        /**
         * show a content view
         */
        show: function(view) {
            if ( this.current ) {
                // dispose the previous current view
                this.current.dispose();
            }
            
            this.current = view;
            
            this.current.appendTo('main');
            
            this.$('aside').removeClass('hidden');
        },
        
    });
    
    return new Layout;
});