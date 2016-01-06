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
    },
    
    config: {
        'core/main': {
            'locale': "en",
            'root': "/collabor8/",
            'api': "http://localhost/collabor8/api/",
            'header': "X-Auth-Token",
        },
    },
    
    shim: {
        'bootstrap': ['jquery'],
    },
    
    packages: ['core', 'users', 'projects', 'tasks'],
    
    deps: ['layout', 'core'],
    
    callback: function() {
        var Backbone = require('backbone');
        
        if (! Backbone.history.started ) {
            Backbone.history.start({pushState: false});
        }
    },
    
});