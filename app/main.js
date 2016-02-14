/**
 * 
 */
define(['require', 'module', 'common', 'people', 'projects'], 
function(require, module) {
  'use strict';
  
  require(['jquery', 'lib/session', 'layout', 'router', 'lib/notifier'], 
  function($, session, layout, router, notifier) {
    
    var config = module.config();
    
    // JQuery global ajax request handler
    $(document).ajaxSend(function(event, xhr, options) {
      // prepend api url
      options.url = config.api + options.url;

      // set token header
      xhr.setRequestHeader(config.header, session.get('jwt-token'));
    })
    
    // JQuery global error handler
    $(document).ajaxError(function(event, xhr, options, thrownError) {
      switch ( xhr.status ) {
        case 401: {
          // Unauthorized
          layout.showLogin();
        } 
        break;
        
        case 422: {
          // Invalid form data
          notifier.show("Please, try again", "Error occured", "error");
        } 
        break;
        
        default: {
            // Any error 
        }
      }
    })
    
    // JQuery global success handler
    $(document).ajaxSuccess(function(event, xhr, options) {
      var token = xhr.getResponseHeader(config.header);
        
      if ( token ) {
        try {
          var payload = token.split('.')[1],
              data = JSON.parse(atob(payload));
          
          session.set('jwt-token', token);
          session.set('user.id', data.sub);
          session.set('user.name', data.name);
          session.set('user.email', data.email);
        } catch (err) {
          // Do nothing yet
          // Next ajax call will catch 401 error, and trigger a redirect.
        }
      }
    })
    
    // start the router
    router.start();
  })
  
})