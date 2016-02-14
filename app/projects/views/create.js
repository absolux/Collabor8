/**
 * 
 */
define(['vue', 'text!../templates/create.html'], function(Vue, tpl) {
  'use strict';
  
  var name = 'projects-start-content';
  
  Vue.component(name, {
    
    template: tpl,
    
    data: function() {
      return {
        
      }
    },
    
    methods: {
      handleSubmit: function(e) {
        
      }
    },
    
    activate: function(done) {
      setTimeout(done, 300)
    }
    
  })
  
  return name;
})