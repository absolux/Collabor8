/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    module.exports = Backbone.View.extend({
        manage: true,
        
        template: require('template!common/sidebar'),
        
        afterRender: function() {
            this.$el.parent().delay(200).animate({left: 0}, 100);
        },
    });
});