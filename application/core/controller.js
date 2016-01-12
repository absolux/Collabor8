/**
 * 
 */
define(['require', '_lib/controller'],
function(require, Controller) {
    'use strict';
    
    return Controller.extend({
        
        routes: {
            '': "goHome",
        },
        
        goHome: function() {
            require(['./views/home', './layout'], function(HomeView, layout) {
                layout.show(new HomeView);
            });
        },
        
    });
});