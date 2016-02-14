/**
 * 
 */
define(['vue', 'text!common/templates/layout.html', 'lib/session', 'common/views/login'], 
function(Vue, tpl, session) {
  'use strict';
  
  Vue.config.convertAllProperties = true;
  
  Vue.component('loading', {
    template: '<p><i class="fa fa-spin fa-circle-o-notch pull-right text-muted" style="font-size: 1.6em;"></i></p>'
  })
  
  return new Vue({
    
    el: 'body',
    
    replace: false,
    
    template: tpl,
    
    data: {
      // current content component
      content: 'loading',
      
      // display or not the login form
      showModal: false,
      
      // display or not the sidebar
      showSidebar: session.has('jwt-token')
    },
    
    methods: {
      
      /**
       * Set the current content
       * 
       * @param {String} Vue component name
       */
      setContent: function(component) {
        var vm = this;
        
        this.content = 'loading';
        Vue.nextTick(function() { vm.content = component });
        
        return this;
      },
      
      /**
       * Display the login form
       */
      showLogin: function() {
        this.showModal = true
        return this;
      }
    }
    
  })
  
});