/**
 * 
 */
define(['require', '_lib/controller'],
function(require, Controller) {
    'use strict';
    
    return Controller.extend({
        
        routes: {
            'projects/:pid/tasks': "home",
            'projects/:pid/tasks/:id': "show",
        },
        
        /**
         * list all project tasks
         * 
         * @param {int} project id
         */
        home: function(pid) {
            
        },
        
        /**
         * show task detail
         * 
         * @param {int} project id
         * @param {int} task id
         */
        show: function(pid, id) {
            
        },
        
    });
});