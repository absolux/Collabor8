/**
 * 
 */
require.config({
    
    baseUrl: "application",
    
    paths: {
        'jquery':               "../vendor/jquery/dist/jquery",
        'toastr':               "../vendor/toastr/toastr",
        'underscore':           "../vendor/underscore/underscore",
        'backbone':             "../vendor/backbone/backbone",
        'bootstrap':            "../vendor/bootstrap/dist/js/bootstrap",
        'moment':               "../vendor/moment/moment",
        'vue':                  "../vendor/vue/dist/vue",
        'fullcalendar':         "../vendor/fullcalendar/dist/fullcalendar",
        'text':                 "../vendor/requirejs-text/text",
    },
    
    config: {
        'core/main': {
            'locale':   "en",
            'api':      "http://localhost/collabor8/api/",
            'header':   "X-Auth-Token",
        },
    },
    
    shim: {
        'bootstrap': ['jquery'],
        '_lib/util': ['underscore', 'backbone'],
    },
    
    packages: ['core', 'users', 'projects', 'tasks', 'calendar'],
    
    deps: ['core', 'projects', 'users'],
    
    callback: function() {
        var Backbone = require('backbone');
        
        if (! Backbone.history.started ) {
            Backbone.history.start({pushState: false});
        }
    },
    
});