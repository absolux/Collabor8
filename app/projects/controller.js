/**
 * 
 */
define(['require', 'lib/controller'], function(require, Controller) {
  'use strict';
  
  return Controller.extend({
    
    routes: {
      'projects': "home",
      'projects/start': "create"
    },
    
    home: function() {
      require(['layout', './views/home'], function(layout, component) {
        layout.setContent(component)
      })
    },
    
    create: function() {
      require(['layout', './views/create'], function(layout, component) {
        layout.setContent(component)
      })
    }
    
  })
  
})