/* 
 * The MIT License
 *
 * Copyright 2015 absolux.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

require.config({
    baseUlr: "app",
    
    paths: {
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
    
    shim: {
        'bootstrap': ['jquery']
    }
});


// kick off the application
require(['app'], function(app) {
    'use strict';
    
    // JQuery global event handlers
    $(document).ajaxSend(function(event, jqXHR, options) {
        // prepend api url
        options.url = app.api + encodeURIComponent(options.url);
        
        // set token header
        jqXHR.setRequestHeader(app.header, app.session.get('user.token'));
    });
    
    $(document).ajaxError(function(event, jqXHR, options, thrownError) {
        if ( jqXHR.statusCode(401) ) {
            app.redirect('/login');
        }
    });
    
    $(document).ajaxSuccess(function(event, jqXHR, options) {
        var token = jqXHR.getResponseHeader(app.header);
        
        if ( token ) {
            try {
                var payload = token.split('.')[1];
                data = JSON.parse(atob(payload));
                
                app.session.set('user.token', token);
                app.session.set('user.name', data.name);
                app.session.set('user.email', data.email);
            } catch (err) {
                // Do nothing yet
                // Next ajax call will catch 401 error, and trigger a redirect.
            }
        }
    });
    
    app.start();
});