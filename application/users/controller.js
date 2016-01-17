/**
 * 
 */
define(['require', '_lib/controller'],
function(require, Controller) {
    'use strict';
    
    return Controller.extend({
        
        routes: {
            'people': "home",
            'people/:id': "show",
            'people/:id/edit': "edit",
        },
        
        home: function() {
            require(['./views/home', 'core/layout', './models/user'], 
            function(HomeView, layout, User) {
                layout.show(new HomeView({ collection: User.list }));
            });
        },
        
        edit: function(id) {
            
        },
        
        show: function(id) {
            
        },
        
    });
});