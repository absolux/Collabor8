/* 
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var App = require('app');
    var Marionette = require('backbone.marionette');
    
    var Router = Marionette.AppRouter.extend({
        appRoutes: {}
    });
    
    module.exports = Router;
});