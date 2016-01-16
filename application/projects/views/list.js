/**
 * 
 */
define(['require', '_lib/view', 'text!../templates/list'],
function(require, View, tpl) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
        
        template: tpl,
        
        afterRender: function() {
            var view = this;
            
            this.collection.fetch({
                'reset': true,
                'success': function(collection) {
                    require(['vue'], function(Vue) {
                        var options = {
                            'el': '[role=project-list]',
                            'data': { items: collection.toJSON() },
                        }
                        
                        view.components.push(new Vue(options));
                    });
                },
            });
        },
        
    });
});