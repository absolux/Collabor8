/**
 * 
 */

define(['moment'], function(moment) {
	'use strict';
	
	// moment.js
	moment.locale('en', {
        calendar: {
            sameDay:  "[Today]",
            nextDay:  "[Tomorrow]",
            nextWeek: "[Next] dddd",
            lastDay:  "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "YYYY-MM-DD",
        },
    });
	
	var exports = {};
	exports.moment = moment;
    
    return exports;
});