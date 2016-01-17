/**
 * 
 */
define(['require', '_lib/controller'],
function(require, Controller) {
    'use strict';
    
    return Controller.extend({
        
        routes: {
            'projects': "home",
            'projects/start': 'create',
            'projects/:id': 'show',
            'projects/:id/edit': 'edit',
        },
        
        home: function() {
            require(['./views/list', 'core/layout', './models/project'], 
            function(ListView, layout, Project) {
                layout.show(new ListView({ collection: Project.list }));
            });
        },
        
        create: function() {
            require(['./views/start', 'core/layout', './models/project'], 
            function(FormView, layout, Project) {
                layout.show(new FormView({ collection: Project.list }));
            });
        },
        
        edit: function() {
            
        },
        
        show: function(id) {
            require(['./views/show', 'core/layout', './models/project'],
            function(DashView, layout, Project) {
                var project = Project.list.get(id);
                
                layout.show(new DashView({ model: project }));
            });
        },
        
    });
});