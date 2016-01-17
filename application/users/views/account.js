/**
 * 
 */
define(['require', '_lib/view', 'text!../templates/account'], 
function(require, View, tpl) {
    'use strict';
    
    return View.extend({
        
        className: 'container-fluid',
        
        template: tpl,
        
    });
});