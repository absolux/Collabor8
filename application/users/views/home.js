/**
 * 
 */
define(['require', '_lib/view', 'text!../templates/home'], 
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
                            'el': '[role=people-list]',
                            'data': {
                                'imgSource': "assets/images/demo/user-", 
                                'items': collection.toJSON(),
                                'imgExt': ".jpg",
                            },
                        }
                        
                        view.components.push(new Vue(options));
                    });
                },
            });
        },
        
    });
});