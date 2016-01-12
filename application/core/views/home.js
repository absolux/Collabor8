/**
 * 
 */
define(['_lib/view', 'text!../templates/home'],
function(View, tpl) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
		
		template: tpl,
        
    });
});