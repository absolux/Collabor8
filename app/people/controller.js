/**
 * 
 */
define(['require', 'lib/controller'], function(require, Controller) {
  'use strict';
  
  return Controller.extend({
    
    routes: {
      'people': "home",
      'people/:id': "show",
      'people/:id/edit': "edit"
    },
    
    home: function() {
      require(['layout', './views/home'], function(layout, component) {
        layout.setContent(component)
      })
    },
    
    show: function(id) {
      
    },
    
    edit: function(id) {
      
    }
    
  })
  
})