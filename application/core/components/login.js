/**
 * 
 */
define(['require', 'vue', 'jquery', 'bootstrap'],
function(require, Vue, $) {
    'use strict';
    
    return Vue.extend({
        
        data: function() {
            return {
                email: '',
                password: '',
            };
        },
        
        /**
         * attached event hook
         */
        attached: function() {
            $(this.$el).modal({
                show: true,
                keyword: false,
                backdrop: 'static',
            });
        },
        
        methods: {
            handleSubmit: function() {
                var data = {
                    'email': this.email,
                    'password': this.password,
                };
                
                require(['jquery', '_lib/ui/notifier'], function($, notifier) {
                    $.post('authenticate', data)
                     .done(function() { location.reload(); })
                     .fail(function() { 
                         notifier.show("Invalid credentials !", "Login Failure", 'error'); 
                     });
                });
            },
        },
        
    });
});