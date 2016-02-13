/**
 * 
 */
define(['require', 'lib/controller'], function(require, Controller) {
  'use strict';
  
  return Controller.extend({
    
    routes: {
      '': "goHome"
    },
    
    goHome: function goHome() {
      require(['layout', './views/home'], function(layout, component) {
        layout.setContent(component)
      });
    }
    
  })
})