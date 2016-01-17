/**
 * 
 */
define(['require', '_lib/view', 'text!../templates/show'],
function(require, View, tpl) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
        
        template: tpl,
        
    });
});