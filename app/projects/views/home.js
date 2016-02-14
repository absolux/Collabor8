/**
 * 
 */
define(['vue', 'text!../templates/home.html'], function(Vue, tpl) {
  'use strict';
  
  var name = 'projects-home-content';
  
  Vue.component(name, {
    
    template: tpl,
    
    data: function() {
      return {
        items: []
      }
    },
    
    activate: function(done) {
      setTimeout(done, 300)
    }
    
  })
  
  return name;
})