/**
 * 
 */

require.config({
    baseUrl: "app",
    
    paths: {
        "toastr":               "../vendor/toastr/toastr",
        "underscore":           "../vendor/underscore/underscore",
        "template":             "../vendor/lodash-template-loader/loader",
        "jquery":               "../vendor/jquery/dist/jquery",
        "backbone":             "../vendor/backbone/backbone",
        "backbone.marionette":  "../vendor/marionette/lib/backbone.marionette",
        "bootstrap":            "../vendor/bootstrap/dist/js/bootstrap"
    },
    
    map: {
        '*': {
            'lodash': 'underscore'
        }
    },
    
    config: {
        app: {
            'locale': 'en',
            'root': "/collabor8/",
            'api': "http://localhost/collabor8/api/",
            'header': "X-Auth-Token"
        }
    },
    
    lodashLoader: {
        root: "./tpl/"
    },
    
    shim: {
        'bootstrap': ['jquery']
    }
});


// kick off the application
require(['app', 'router', 'lib/session', 'jquery'], function(app, router, session, $) {
    'use strict';
    
    // JQuery global event handlers
    $(document).ajaxSend(function(event, jqXHR, options) {
        // prepend api url
        options.url = app.api + encodeURIComponent(options.url);
        
        // set token header
        jqXHR.setRequestHeader(app.header, session.get('user.token'));
    });
    
    $(document).ajaxError(function(event, jqXHR, options, thrownError) {
        if ( jqXHR.statusCode(401) ) {
            router.redirect('#/login');
        }
    });
    
    $(document).ajaxSuccess(function(event, jqXHR, options) {
        var token = jqXHR.getResponseHeader(app.header);
        
        if ( token ) {
            try {
                var payload = token.split('.')[1],
                    data = JSON.parse(atob(payload));
                
                session.set('user.token', token);
                session.set('user.name', data.name);
                session.set('user.email', data.email);
            } catch (err) {
                // Do nothing yet
                // Next ajax call will catch 401 error, and trigger a redirect.
            }
        }
    });
    
    app.start();
});