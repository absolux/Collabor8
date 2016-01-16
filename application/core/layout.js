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
                // detach the previous current view
                this.current.detach();
            }
            
            this.current = view;
            
            this.current.appendTo('main');
            
            this.$('aside').removeClass('hidden');
        },
        
        showLoginForm: function() {
            require(['./components/login'], function(LoginVue) {
                new LoginVue({ el: '.modal.login-form' });
            });
        },
        
    });
    
    return new Layout;
});