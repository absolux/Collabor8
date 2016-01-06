/**
 * 
 */
define(['require', '_lib/composite-view'], 
function(require, View) {
    'use strict';
    
    var Layout = View.extend({
        
        el: 'body',
        
    });
    
    return new Layout;
});