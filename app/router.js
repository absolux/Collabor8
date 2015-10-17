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
            
            this._isLogin = false;
            if ( callback ) callback.apply(this, args); 
        },
        
        goHome: function() {
            require(['views/layout', 'views/desk'], function(layout, Desk) {
                layout.show(new Desk());
            });
        },
        
        goLogin: function() {
            if ( this._isLogin === true ) {
                return;
            }
            
            this._isLogin = true;
            require(['views/login'], function(Login) {
                (new Login()).render();
            });
        },
    });
    
    module.exports = new Router;
});