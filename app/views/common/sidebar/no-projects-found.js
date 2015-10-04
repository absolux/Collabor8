/**
 *  
 */

define(function(require, exports, module) {
    'use strict';
    
    var Marionette = require('backbone.marionette');
    var _ = require('underscore');
    
    var View = Marionette.ItemView.extend({
        tagName: 'li',
        
        className: 'projects-empty-message',
        
        template: _.template("No Projects Found."),
    });
    
    module.exports = View;
});