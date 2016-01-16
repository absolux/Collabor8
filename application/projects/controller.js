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
            
        },
        
        edit: function() {
            
        },
        
        show: function() {
            
        },
        
    });
});