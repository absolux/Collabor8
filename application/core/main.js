/**
 * 
 */
define(['module', 'jquery', 'router', '_lib/session', '_lib/ui/notifier', './controller', './layout'], 
function(module, $, router, session, notifier, Controller, layout) {
    'use strict';
    
    // retrieve the module configuration vars
    var config = module.config();
    
    // check user active session
    session.active = session.has('user.token');
    
    // init the main controller of the core package
    new Controller(router);
    
    // render app layout
    layout.appendTo('body');
    
    // JQuery global ajax request handler
    $(document).ajaxSend(function(event, jqXHR, options) {
        // prepend api url
        options.url = config.api + options.url;
        
        // set token header
        jqXHR.setRequestHeader(config.header, session.get('user.token'));
    });
    
    // JQuery global error handler
    $(document).ajaxError(function(event, jqXHR, options, thrownError) {
        switch ( jqXHR.status ) {
            case 401: {
                layout.showLoginForm();
            }break;
            
            case 422: {
                notifier.show("Please, try again", "Error occured", "error");
            }break;
            
            default: {
                // Any error 
            }
        }
    });
    
    // JQuery global success handler
    $(document).ajaxSuccess(function(event, jqXHR, options) {
        var token = jqXHR.getResponseHeader(config.header);
        
        if ( token ) {
            try {
                var payload = token.split('.')[1],
                    data = JSON.parse(atob(payload));
                
                session.set('user.token', token);
                session.set('user.id', data.sub);
                session.set('user.name', data.name);
                session.set('user.email', data.email);
            } catch (err) {
                // Do nothing yet
                // Next ajax call will catch 401 error, and trigger a redirect.
            }
        }
    });
    
});