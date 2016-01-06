/**
 * 
 */
define(['require', '_lib/composite-view'],
function(require, View) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
		
		template: require('text!../templates/home'),
        
    });
});