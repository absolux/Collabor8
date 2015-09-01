/* 
 * The MIT License
 *
 * Copyright 2015 absolux.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

define(function(require, exports, module) {
    'use strict';
    
    // dependencies
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('backbone.marionette');
    var Router = require('router');
    var Layout = require('views/layout');
    
    // options names
    var defaultOptions = ['locale', 'root', 'api', 'header'];
    
    // Application class
    var Application = Marionette.Application.extend({
        initialize: function() {
            this.mergeOptions(module.config(), defaultOptions);
            
            // define app router
            this.router = new Router();
            
            // define app layout
            this.layout = new Layout();
            
            // define session app module
            this.session = require('lib/session');
        },
        
        onBeforeStart: function() {
            this.layout.render();
        },
        
        onStart: function(options) {
            if (! Backbone.history.started ) {
                Backbone.history.start({pushState: false, root: this.root});
            }
        },
        
        /**
         * alias of router navigate function, with trigger option set to true
         * 
         * @param {string} fragment
         * @param {object} options
         */
        redirect: function(fragment, options) {
            options = _.extend({trigger: true}, options);
            
            this.router.navigate(fragment, options);
        }
    });
    
    module.exports = new Application();
});