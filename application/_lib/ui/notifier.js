/**
 * 
 */

define(function(require, exports) {
    'use strict';
    
    var _ = require('underscore');
    
    /**
     * show a toastr notification
     * 
     * @param {string} message
     * @param {string} title
     * @param {object|string} options
     */
    exports.show = function(message, title, options) {
        options = options || {};
            
        if ( typeof options === 'string' ) {
            options = {'type': options};
        }

        _.defaults(options, {
            'type': 'info', 
            'positionClass': 'toast-bottom-right',
            'closeButton': true
        });
        
        if ( options.sticky === true ) {
            options.timeOut = 0;
            options.extendedTimeOut = 0;
        }
        
        require(['toastr'], function(toast) {
            toast[options.type](message, title, options);
        });
    };
});