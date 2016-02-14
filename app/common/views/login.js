/**
 * 
 */
define(['require', 'vue', 'text!../templates/login.html'], 
function(require, Vue, tpl) {
  'use strict';
  
  return Vue.component('login-modal', {
    
    template: tpl,
    
    props: {
      show: Boolean
    },
    
    data: function() {
      return {
        credentials: {
          email: '',
          password: ''
        }
      }
    },
    
    methods: {
      // handle an authentication attempt
      attempt: function() {
        var data = this.credentials;
        
        require(['jquery'], function($) {
          $.post('authenticate', data)
           .done(function() { location.reload() })
           .fail(function() {
              require(['lib/notifier'], function(notifier) {
                notifier.show("Invalid credentials !", "Login Failure", 'error')
              })
           })
        })
      }
    }
  })
  
})