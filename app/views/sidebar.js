/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    module.exports = Backbone.View.extend({
        manage: true,
        
        template: require('template!sidebar'),
        
        afterRender: function() {
            this.$el.parent().delay(200).animate({left: 0}, 100);
        },
        
        initialize: function() {
            // listen routing to active links 
            this.listenTo(Backbone.history, 'route', function(router, name, args) {
                console.log(name);
            });
        }
    });
});