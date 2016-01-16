/**
 * 
 */
define(['require', '_lib/view', 'text!../templates/start'], 
function(require, View, tpl) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
        
        template: tpl,
        
        afterRender: function() {
            var view = this;
            
            require(['underscore', 'vue'], function(_, Vue) {
                var options = {
                    'el': "[role=project-form]",
                    'data': {name: '', desc: ''},
                    'methods': {
                        'handleSubmit': function() {
                            view._create(_.pick(this.$data, 'name', 'desc'));
                        },
                    }
                };
                
                view.components.push(new Vue(options));
            });
        },
        
        /**
         * creates a new project
         */
        _create: function(data) {
            this.collection.create(data, {
                'success': function(model) {
                    var url = '#/projects/' + model.id;
                    
                    require('router').navigate(url, true);
                },
            });
        },
        
    });
});