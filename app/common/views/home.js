/**
 * 
 */
define(['vue', 'text!../templates/home.html'], function(Vue, tpl) {
  'use strict';
  
  var name = 'common-home-content';
  
  Vue.component(name, {
    
    template: tpl,
    
    activate: function(done) {
      setTimeout(done, 300)
    }
    
  })
  
  return name;
})