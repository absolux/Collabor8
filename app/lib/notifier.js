/**
 * 
 */
define(['exports', 'underscore', 'toastr'], function(exports, _, toastr) {
  'use strict';
  
  /**
   * Show a toastr notification
   * 
   * @param {string} message
   * @param {string} title
   * @param {object|string} options
   */
  exports.show = function show(message, title, options) {
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

    toastr[options.type](message, title, options);
  }
  
})