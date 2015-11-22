/**
 * 
 */

require.config({
    baseUrl: "application",
    
    paths: {
        "xeditable":            "../vendor/x-editable/dist/bootstrap3-editable/js/bootstrap-editable",
        "toastr":               "../vendor/toastr/toastr",
        "underscore":           "../vendor/underscore/underscore",
        "template":             "../vendor/lodash-template-loader/loader",
        "jquery":               "../vendor/jquery/dist/jquery",
        "backbone":             "../vendor/backbone/backbone",
        "backbone.layout":      "../vendor/layoutmanager/backbone.layoutmanager",
        "bootstrap":            "../vendor/bootstrap/dist/js/bootstrap",
        "moment":               "../vendor/moment/moment",
    },
    
    map: {
        '*': {
            'lodash': 'underscore',
        },
    },
    
    config: {
        app: {
            'locale': 'en',
            'root': "/collabor8/",
            'api': "http://localhost/collabor8/api/",
            'header': "X-Auth-Token",
        },
    },
    
    lodashLoader: {
        root: "./templates/",
    },
    
    shim: {
        'app': ['bootstrap'],
        'bootstrap': ['jquery'],
        'xeditable': ['bootstrap'],
    },
});


// kick off the application
require(['jquery', 'app', 'router', 'lib/session', 'lib/ui/notifier'], 
        function($, app, router, session, notifier) {
    'use strict';
    
    // JQuery global event handlers
    $(document).ajaxSend(function(event, jqXHR, options) {
        // prepend api url
        options.url = app.config.api + options.url;
        
        // set token header
        jqXHR.setRequestHeader(app.config.header, session.get('user.token'));
    });
    
    $(document).ajaxError(function(event, jqXHR, options, thrownError) {
        switch ( jqXHR.status ) {
            case 401: {
                router.goLogin();
            }break;
            
            case 422: {
                notifier.show("Please, try again", "Error occured", "error");
            }break;
            
            default: {
                // Any error 
            }
        }
    });
    
    $(document).ajaxSuccess(function(event, jqXHR, options) {
        var token = jqXHR.getResponseHeader(app.config.header);
        
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
    
    // check user active session
    window.isLogged = session.has('user.token');
    
    app.start();
});