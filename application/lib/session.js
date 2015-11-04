/**
 * 
 */

define(function(require, exports) {
    'use strict';
    
    exports.set = function(key, value) {
        window.sessionStorage.setItem(key, value);
    };
    
    exports.get = function(key) {
        return window.sessionStorage.getItem(key);
    };
    
    exports.flush = function() {
        window.sessionStorage.clear();
    };
    
    exports.has = function(key) {
        return this.get(key) !== null;
    };
});