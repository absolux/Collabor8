/* 
 * 
 */
define(['require', '_lib/view'],
function(require, View) {
    'use strict';
    
    return View.extend({
        
        template: require('text!../templates/sidebar'),
        
    });
});