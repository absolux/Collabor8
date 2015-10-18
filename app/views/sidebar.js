/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    module.exports = Backbone.View.extend({
        manage: true,
        
        template: require('template!sidebar'),
        
        afterRender: function() {
            var self = this;
            
            // append the projects list view
            require([
                'views/common/sidebar-projects-list',
                'models/project',
            ], function(SubView, Project) {
                var projects = Project.getList();
                var view = new SubView({collection: projects});
                
                self.insertView(view);
                projects.fetch({reset: true});
            });
            
            this.$el.parent().delay(200).animate({left: 0}, 100);
        },
    });
});