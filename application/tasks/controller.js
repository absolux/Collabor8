/**
 * 
 */
define(['require', '_lib/controller'],
function(require, Controller) {
    'use strict';
    
    return Controller.extend({
        
        routes: {
            'projects/:pid/tasks': "home",
        },
        
        /**
         * list all project tasks
         * 
         * @param {int} project id
         */
        home: function(pid) {
            require(['core/layout', './views/home', './models/task', 'projects/models/project'],
            function(layout, HomeView, Task, Project) {
                var tasks = window.tasks = new Task.Collection();
                
                layout.show(new HomeView({ collection: tasks, model: Project.list.get(pid) }));
                tasks.fetch({ 'reset': true, 'data': { 'project_id': pid } });
            });
        },
        
    });
});