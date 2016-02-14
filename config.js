/**
 * 
 */
require.config({
  
  baseUrl: "app",
  
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
  
  config: {},
  
  shim: {
    'bootstrap': ['jquery']
  },
  
  packages: ['common', 'people', 'projects'],
  
  deps: ['main']
  
})