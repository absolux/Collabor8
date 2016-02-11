/**
 * 
 */
define(['require', '_lib/view', 'text!../templates/home'],
function(require, View, tpl) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
        
        template: tpl,
        
        initialize: function() {
            this.listenTo(this.collection, 'reset', this._onReset);
        },
        
        _onReset: function(collection) {
            var view = this;
            
            require(['vue'], function(Vue) {
                var options = {
                    'el': "[role=task-list]",
                    'data': {
                        'items': collection.toJSON(),
                    },
                }
                
                view.components.push(new Vue(options));
            });
        },
        
    });
});