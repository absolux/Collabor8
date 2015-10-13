/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var Router = Backbone.Router.extend({
        routes: {
            '': 'goHome',
        },
        
        execute: function(callback, args, name) {
            if (! window.isLogged ) {
                this.goLogin();
                return false;
            }
            
            if ( callback ) callback.apply(this, args); 
        },
        
        goHome: function() {
            console.log('home view');
        },
        
        goLogin: function() {
            console.log('login form');
        },
    });
    
    module.exports = new Router;
});